import React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import './App.css';
import { TableHead, Table, Paper, TableRow, TableCell, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';
import { data, datas } from './types/data';
import { addData } from './store/actions';


const styles: StyleRulesCallback = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

interface Props {
    classes: any,
    data: datas,
    addData: any
}

interface State {

}



class App extends React.Component<Props, State> {

    componentDidMount() {
        fetch(window.origin + '/data.json', {
            method: 'GET'
        }).then(response => response.json()
        ).then((data: datas) => {
            data.forEach(data => {
                this.props.addData(data)
            })
        })
    }

    render() {
        const { classes, data } = this.props
        console.log(this.props)
        return (
            <div className="App">
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>ChartType</TableCell>
                                    <TableCell>FilterTypes</TableCell>
                                    <TableCell>Frequency</TableCell>
                                    <TableCell>Active</TableCell>
                                </TableRow>
                                <TableBody>
                                    
                                </TableBody>
                            </TableHead>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    data: state.data
})

const mapDispatchToProps = (dispatch: any) => ({
  addData: (data: data) => dispatch(addData(data))
})

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default withStyles(styles)(connectedApp);
