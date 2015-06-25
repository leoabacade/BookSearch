/**
 * Created by echessa on 4/24/15.
 */


'use strict';

var React = require('react-native');
var BookDetail = require('./BookDetail');
var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableHighlight,
    Image,
    ListView
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    }
});

class SearchResults extends Component {

    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.book)
        };
    }

    render() {

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook.bind(this)}
                style={styles.listView}
                />
        );
    }

    renderBook(book) {
        

        return (
            <TouchableHighlight onPress={() => this.showBookDetail(book)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.cellContainer}>
                        
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{book.booking_model_schedule_id}</Text>
                            <Text style={styles.author}>{book.user_name}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    showBookDetail(book) {

        this.props.navigator.push({
            title: book.volumeInfo.title,
            component: BookDetail,
            passProps: {book}
        });
    }

}

module.exports = SearchResults;