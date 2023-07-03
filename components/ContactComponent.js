import { Text, View, Linking } from "react-native";
import { Button, Icon, Card } from "react-native-elements";
import React, { Component } from "react";
import * as MailComposer from "expo-mail-composer";
class Contact extends Component {
  render() {
    return (
      <View>
        <Card>
          <Card.Title>Our Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>8, Nguyen Van Trang Street</Text>
          <Text style={{ margin: 10 }}>District 1, Ho Chi Minh City</Text>
          <Text style={{ margin: 10 }}>Viet Nam</Text>
          <Text style={{ margin: 10 }}>Tel: +84 934 959 673</Text>
          <Text style={{ margin: 10 }}>Email: duyquan3112@gmail.com</Text>
          <Button
            title=" Send An Email"
            buttonStyle={{ backgroundColor: "black" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.composeMail}
          />
          <View style={{height: 10}}></View>
          <Button
            title=" Make Phone Call"
            buttonStyle={{ backgroundColor: "black" }}
            icon={<Icon name="phone" type="font-awesome" color="white" />}
            onPress={()=>{this.dialCall(84934959673)}}
          />
        </Card>
      </View>
    );
  }
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };

  composeMail() {
    MailComposer.composeAsync({
      recipients: ["duyquan3112@gmail.com"],
      subject: "Contact to Scramble Team",
      body: "I wanna say HI!",
    });
  }
}

export default Contact;
