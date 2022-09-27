import React, { useContext} from "react";
import { ThemeContext } from "../context/theme-context";
import PropTypes from "prop-types";


function ReusableForm(props) {
  const theme = useContext(ThemeContext);
  const buttonStyles = {
    backgroundColor: theme.buttonBackground,
    color: theme.textColor,
  }
    const inputStyles = {
      backgroundColor: theme.inputBackground,
      color: theme.textColor,
    }
  
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          style={inputStyles}
          type='text'
          name='names'
          placeholder='Pair Names' />
          <br/>
        <input
          style={inputStyles}
          type='text'
          name='location'
          placeholder='Location' />
        <textarea
          style={inputStyles}
          name='issue'
          placeholder='Describe your issue.' />
        <button style={buttonStyles} type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;