import { connect } from 'react-redux';
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";
import { ThemeContext } from "../context/theme-context";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false, 
      selectedTicket: null,
      editing: false
    };
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
      const action = {
        type: 'ADD_TICKET',
        id: id,
        names: names,
        location: location,
        issue: issue,
      }
      dispatch(action);
      const action2 = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action2);
      // this.setState({formVisibleOnPage: false});
    }
  

    handleChangingSelectedTicket = (id) => {
      const selectedTicket = this.props.mainTicketList[id];
      this.setState({selectedTicket: selectedTicket});
    }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }
  
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
    const action = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action);
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage
      // }));
    }
  }

  render() {
    // We access the context value.
    let theme = this.context;

    if (!theme) {
      throw new Error("ThemeContext must be used within a ThemeContext.Provider!");
    }

    // We create our button styles.
    const buttonStyles = { 
      backgroundColor: theme.buttonBackground, 
      color: theme.textColor, 
    }

    console.log("Theme button background: " +theme.buttonBackground);

    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket =  {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null)  {
      currentlyVisibleState = <TicketDetail
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    }
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
      buttonText = "Add Ticket";   
     }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button style={buttonStyles} onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

  const mapStateToProps = state => {
    return {
      mainTicketList: state.mainTicketList,
      formVisibleOnPage: state.formVisibleOnPage
    }
  }
  
  // Note: we are now passing mapStateToProps into the connect() function.
  TicketControl = connect(mapStateToProps)(TicketControl);

  // We've created a contextType property and set it to ThemeContext.
  TicketControl.contextType = ThemeContext;

export default TicketControl;