import { View, Text ,Image,ScrollView,Linking } from 'react-native';
import React ,{Component} from 'react';
import {Card,Title,Paragraph} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Header from '../../components/AppBar';
import axios from 'axios';

export default class HomeScreen extends Component {
    state ={
        articles:[],
        isLoading :true,
        errors:null,
    };

    getArticle(){
        axios
        .get(
            "https://newsapi.org/v2/everything?q=keyword&apiKey=aa5332d4015f474eadc84e691abadea9"
        )
        .then(response => response.data.articles.map(article =>({
            publishedAt : `${article.publishedAt}`,
            title : `${article.title}`,
            url : `${article.url}`,
            description : `${article.description}`,
            urlToImage : `${article.urlToImage}`,
        }))
    ).then(articles => {
        this.setState({
            articles,
            isLoading:false
        });
    })
    .catch(error => this.setState({error,isLoading:false}));
    }
    componentDidMount(){
        this.getArticle();
    }
    render(){
        const {isLoading,articles} = this.state;
        return(
            <SafeAreaProvider>
            <View>
                <Header/>
                <ScrollView>
                    {!isLoading ? (
                        articles.map(article =>{
                            const {publishedAt,title,url,description,urlToImage}= article;
                            return (
                                <Card
                                 key={url}
                                 style={{marginTop:10,borderColor:"black",
                                 borderRadius: 5,
                                 borderBottomWidth:1}}
                                 onPress={() => {
                                    Linking.openURL(`${url}`)
                                 }}
                                >
                                  <View style={{flexDirection:'row'}}>
                                    {/* text */}
                                    <View style={{justifyContent:"space-around",flex:2/3,margin:10}}>
                                        <Title>{title}</Title>
                                    </View>
                                    {/* Image */}
                                    <View style={{flex:1/3,margin:10}}>
                                        <Image style={{width:120,height:120}}
                                            source={{uri:urlToImage}}
                                        />
                                    </View>

                                  </View>
                                  <View style={{margin:10}}>
                                    <Paragraph>{description}</Paragraph>
                                    <Text>Published At : {publishedAt}</Text>
                                  </View>
                                </Card>
                            );
                        })
                    ) : (
                        <Text style={{justifyContent:"center",alignItems:"center"}}>Loading...</Text>
                    )}
                </ScrollView>
            </View>
            </SafeAreaProvider>
        )
    }
}
