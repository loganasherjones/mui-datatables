import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import { TextField, InputAdornment } from '@material-ui/core';
import { Sort, ArrowDownward, ArrowUpward } from '@material-ui/icons';

const defaultHeadCellStyles = theme => ({
  root: {},
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
  },
  help: {
    color: theme.palette.text.hint,
    cursor: 'default',
  },
  tooltip: {
    cursor: 'pointer',
  },
  pointer: {
    cursor: 'pointer',
  },
  mypopper: {
    '&[data-x-out-of-boundaries]': {
      display: 'none',
    },
  },
  data: {
    display: 'inline-block',
  },
});

class TableHeadCellWithFilter extends React.Component {
  static propTypes = {
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Current sort direction */
    sortDirection: PropTypes.string,
    /** Callback to trigger column sort */
    toggleSort: PropTypes.func.isRequired,
    /** Sort enabled / disabled for this column **/
    sort: PropTypes.bool.isRequired,
    /** Hint tooltip text */
    hint: PropTypes.string,
  };

  handleFilterChange = event => {
    const { onFilterUpdate, index } = this.props;
    const value = event.target.value;
    onFilterUpdate(index, value, 'textField');
  };

  handleSortClick = () => {
    this.props.toggleSort(this.props.index);
  };

  renderSortIcon = () => {
    const { sortDirection, classes } = this.props;
    const sortActive = sortDirection !== null && sortDirection !== undefined ? true : false;
    const iconProps = {
      className: classes.pointer,
      fontSize: 'small',
      onClick: this.handleSortClick,
    };

    if (!sortActive) {
      return <Sort {...iconProps} />;
    } else if (sortDirection === 'asc') {
      return <ArrowUpward {...iconProps} />;
    } else {
      return <ArrowDownward {...iconProps} />;
    }
  };

  renderHint = () => {
    const { hint, classes } = this.props;
    if (!hint) {
      return null;
    }

    return (
      <Tooltip
        title={hint}
        placement={'bottom-end'}
        classes={{ tooltip: classes.tooltip, popper: classes.mypopper }}
        enterDelay={300}>
        <HelpIcon fontSize="small" className={classes.help} />
      </Tooltip>
    );
  };

  render() {
    const { children, classes, options, sortDirection, sort, filterValue } = this.props;
    const name = children;

    const cellClass = classNames({
      [classes.root]: true,
      [classes.fixedHeader]: options.fixedHeader,
    });

    return (
      <TableCell className={cellClass} scope={'col'} sortDirection={sortDirection}>
        {options.sort && sort ? (
          <span>
            <div className={classes.data}>
              <TextField
                id={name}
                name={name}
                label={name}
                onChange={this.handleFilterChange}
                value={filterValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {this.renderSortIcon()}
                      {this.renderHint()}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </span>
        ) : (
          <React.Fragment>
            {children}
            {this.renderHint()}
          </React.Fragment>
        )}
      </TableCell>
    );
  }
}

export default withStyles(defaultHeadCellStyles, { name: 'MUIDataTableHeadCell' })(TableHeadCellWithFilter);
