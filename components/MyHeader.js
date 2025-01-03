import React, { Component} from 'react';
// import { Header,Icon,Badge } from 'react-native-elements';
import { Header,Icon,Badge } from '@rneui/themed';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      userId : firebase.auth().currentUser.email,
      value:""
    }
  }

getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notification_status','==',"unread").where('targeted_user_id','==',this.state.userId)
  .onSnapshot((snapshot)=>{
    var unreadNotifications = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: unreadNotifications.length
    })
  })
}

componentDidMount(){
  this.getNumberOfUnreadNotifications()
}


  BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome-5' color='#696969' size={25}
          onPress={() =>this.props.navigation.navigate('Notifications')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        <Header
          leftComponent={<Icon name='bars' type='font-awesome-5' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
          centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#eaf8fe"
        />

)
}

}