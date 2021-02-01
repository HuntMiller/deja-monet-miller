import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUndo } from '@fortawesome/free-solid-svg-icons'
import Typist from 'react-typist';

const _reasonConsumer = {
    id: {
        render: 'render',
        typingComplete: 'typingComplete'
    }
}
class ReasonConsumer extends Component {
    constructor(){
        super();
        const {render, typingComplete} = _reasonConsumer.id;
        this.state = {
            [render]: true,
            [typingComplete]: false
        }
    }

    componentDidUpdate(prevProps){
        const {index} = this.props;
        const {render} = _reasonConsumer.id;

        if(index !== prevProps.index){
            this.setState({
                [render]: false
            }, () => this.setState({ 
                [render]: true
            }, () => this.proceedButton.focus())
            );
        }
    }

    displayContinue = display => {
        const {typingComplete} = _reasonConsumer.id;
        this.setState({
            [typingComplete]: display
        });
    }

    onContinue = e => {
        const {index, progress} = this.props;
        const {typingComplete} = _reasonConsumer.id;
        if(this.state[typingComplete]){
            const targetIndex = this.canContinueForward() ? index + 1 : 0;
            this.setState({
                [typingComplete]: false
            }, e => progress(e, targetIndex));
        }
    }

    canContinueForward = () => {
        const {index, reasons} = this.props;
        return (index < reasons.length - 1);
    }
    
    render(){
        const {reasons, index} = this.props;
        const {render, typingComplete} = _reasonConsumer.id;
        const noJsonFile = !reasons;
        const emptyJsonFile = reasons.length === 0;
        const reason = (noJsonFile || emptyJsonFile) ? 
        {
            header: 'Failed to load'
        } : reasons[index];

        if(!this.state[render])
            return null;
            
        return (
        <form onSubmit={this.onContinue}>
            <Typist
            startDelay={1500}
            avgTypingDelay={100}
            cursor={{
                show: false,
            }}
            onTypingDone={() => this.displayContinue(true)}>
                <h1>{reason.header}</h1>
                <Typist.Delay ms={1500}/>
                <p>{reason.body}</p>
            </Typist>
                <button
                autoFocus="true"
                ref={x => {this.proceedButton = x}}
                type="submit"
                style={{opacity: this.state[typingComplete] ? '1':'0'}} 
                onClick={this.onContinue}>
                    <FontAwesomeIcon icon={this.canContinueForward() ? faHeart : faUndo} />
                    </button>
        </form>
        );
    }
}

export default ReasonConsumer;