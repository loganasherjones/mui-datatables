import React from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from '../../src/';
import DATA from './data';
import { Switch, MuiThemeProvider, createMuiTheme, Paper, Typography } from '@material-ui/core';

class Example extends React.Component {
  render() {
    const columns = [
      {
        name: 'Name',
        options: {
          filter: true,
          filterList: [],
          filterOptions: ['a', 'b', 'c', 'Business Analyst'],
          hint: 'Some hint here',
        },
      },
      {
        name: 'Title',
        options: {
          filter: true,
        },
      },
      {
        name: 'Location',
        options: {
          filter: false,
        },
      },
      {
        name: 'Age',
        options: {
          filter: true,
        },
      },
      {
        name: 'Salary',
        options: {
          filter: true,
          sort: false,
          hint: 'Hint with no filter',
        },
      },
    ];

    const options = {
      filter: false,
      selectableRows: true,
      filterType: 'textField',
      responsive: 'stacked',
      rowsPerPage: 10,
      page: 1,
    };

    return <MUIDataTable title={'ACME Employee list'} data={DATA} columns={columns} options={options} />;
  }
}

class Root extends React.Component {
  state = {
    themeType: 'light',
  };

  lightTheme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: { type: 'light' },
  });

  darkTheme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: { type: 'dark' },
  });

  toggleTheme = () => {
    let newTheme;
    if (this.state.themeType === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    this.setState({ themeType: newTheme });
  };

  renderToggleButton = () => {
    const { themeType } = this.state;
    const isChecked = themeType === 'dark';
    return (
      <Paper style={{ marginBottom: '10px' }}>
        <Switch value="checked" checked={isChecked} onChange={this.toggleTheme} />
        <Typography variant="body1">Toggle Theme</Typography>
      </Paper>
    );
  };

  render() {
    let theme;
    if (this.state.themeType === 'light') {
      theme = this.lightTheme;
    } else {
      theme = this.darkTheme;
    }

    return (
      <MuiThemeProvider theme={theme}>
        {this.renderToggleButton()}
        <Example />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app-root'));
