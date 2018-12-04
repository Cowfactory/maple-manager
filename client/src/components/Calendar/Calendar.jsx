import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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

function DateAndTimePickers(props) {
    const { classes } = props;
    // Construct date string for calendar
    let date = new Date();
    let timeStr = `${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}T10:00`;
    return (
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
                onChange={props.handleChange}
            />
        </form>
    )
}

DateAndTimePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DateAndTimePickers);