import React, { Component } from 'react'

class AsyncComponent extends Component{
    state = {
        isLoading: false, component: null
    }
    componentDidMount(){
        const { isLoading, component } = this.state;
        if(!isLoading && component === null){
            this.setState({isLoading: true}, this.loadComponent);
        }
    }

    loadComponent = () => {
        this.props.componentProvider().then(Component => {
          this.setState({ Component, isLoading: false }); 
        });
    };

    render(){
        const { Component } = this.state;
        const { componentProps } = this.props;
        if (Component) {
          return <Component {...componentProps}/>;
        }
        return <span>Ladowane...</span>;
    }
}   

export default AsyncComponent;