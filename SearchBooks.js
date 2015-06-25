/**
 * Created by echessa on 4/24/15.
 */

'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');
var SearchBookingResults = require('./SearchBookingResults');
var UserDetail = require('./UserDetail');
var Buffer = require('./node_modules/buffer/').Buffer
var {
    StyleSheet,
    View,
    Text,
    Component,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AlertIOS
    } = React;

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    }
});

class SearchBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookAuthor: '',
            bookTitle: '',
            isLoading: false,
            errorMessage: ''
        };
    }


    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>Search by book title and/or author</Text>
                <View>
                    <Text style={styles.fieldLabel}>Book Title:</Text>
                    <TextInput style={styles.searchInput} onChange={this.bookTitleInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Author:</Text>
                    <TextInput style={styles.searchInput} onChange={this.bookAuthorInput.bind(this)}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchBooks.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    }

    bookTitleInput(event) {
        this.setState({ bookTitle: event.nativeEvent.text });
        AlertIOS.alert('you have typed', this.state.bookTitle);
    }

    bookAuthorInput(event) {
        this.setState({ bookAuthor: event.nativeEvent.text });
    }

    searchBooks() {
        this.fetchData();
    }

    fetchData() {

        this.setState({ isLoading: true });

        /*
        var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookTitle !== '') {
            baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
        }
        */
        

        
        

        var baseURL = 'https://demo.syngency.com/admin/api'

        //var baseURL = 'http://tia@demoagency.co:Tia1234!@demo.syngency.com/admin/api/bookings?query='+this.state.bookTitle;


        

        console.log('URL: >>> ' + baseURL);

        var inputvalues = new Buffer("tia@demoagency.co"+":"+"Tia1234!").toString('base64')

        fetch(baseURL, {
              method: 'get',
              headers: {
                'Authorization': 'Basic '+inputvalues,
                'Content-Type': 'application/json'
              }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ isLoading: false});
                
                /*
                if (responseData.items) {

                    this.props.navigator.push({
                        title: 'Search Results',
                        component: SearchResults,
                        passProps: {books: responseData.items}
                    });



                } else {
                    this.setState({ errorMessage: 'No results found'});
                }
                */
                console.log(responseData);
                if (responseData.id) {

                    
                    this.props.navigator.push({
                        title: responseData.first_name+" "+responseData.last_name,
                        component: UserDetail,
                        passProps: {responseData}
                    });

                    
                    //this.setState({ errorMessage: 'login successed'+responseData.first_name+" "+responseData.last_name});



                } else {
                    this.setState({ errorMessage: 'login failed'+" can't find id"});
                }
                
               
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    errorMessage: error
                }))
            .done();

            /*
            fetch('/users', {
              method: 'post',
              headers: {
                'Authorization': 'Basic '+btoa("tia@demoagency.co"+":"+"Tia1234!"),
                'Content-Type': 'application/json'
              })
            }).then(status)
              .then(json)
              .then(function(json) {
                console.log('request succeeded with json response', json)
              }).catch(function(error) {
                console.log('request failed', error)
              })
              .done();
              */
            
    }

}

module.exports = SearchBooks;