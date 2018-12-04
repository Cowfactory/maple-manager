import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './Calendar.module.css';

const mUIStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 220,
    },
});

class DateAndTimePickers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeStr: ''
        }
    }

    componentDidMount() {
        let date = new Date();
        let timeStr = `${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}T10:00`;
        this.setState({ timeStr: timeStr });
        this.props.liftDateToState(timeStr);
    }

    handleDateChange = (e) => {
        this.setState({ timeStr: e.target.value })
        this.props.liftDateToState(this.state.timeStr);
    }

    render() {
        const { classes } = this.props;
        // Construct date string for calendar
        let date = new Date();
        let timeStr = `${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}T10:00`;

        return (
            <div className={styles.Calendar}>
                <form className={classes.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Raid Date"
                        type="datetime-local"
                        defaultValue={timeStr}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleDateChange}
                    />
                </form>
            </div>
        )
    }
}

DateAndTimePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(mUIStyles)(DateAndTimePickers);