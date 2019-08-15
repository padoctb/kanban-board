import React, { Component } from 'react';

// hoc для вынесения логики добавления / измнения задачи

export default options => OriginComponent =>
  class withModifyTask extends Component {
    state = {
      descriptionInput: options(this.props).descriptionInput,
      currentPriority: options(this.props).currentPriority,
      isValid: true,
    };

    changeDescription = ({ target: { value } }) => {
      this.setState({
        descriptionInput: value,
      });
    };

    changePriority = ({ target: { value } }) => {
      this.setState({
        currentPriority: value,
      });
    };

    changeValid = (state) => {
      this.setState({
        isValid: state,
      });
    };

    render() {
      return (
        <OriginComponent
          changeValid={this.changeValid}
          changePriority={this.changePriority}
          changeDescription={this.changeDescription}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
