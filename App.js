import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
function App() {
  const [username,setUserName]=useState(null)
    const [user,setUser]=useState(null)
    useEffect(()=>{
      
        GoogleSignin.configure({
          webClientId: '815261605769-5tehkqe8rh0dvlrv5bg96pvjtajss60o.apps.googleusercontent.com',
        });
    },[])


    // async function onGoogleButtonPress() {
    //     // Check if your device supports Google Play
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     // Get the users ID token
    //     const { idToken } = await GoogleSignin.signIn();
      
    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    //   }


    async function onGoogleButtonPress() {
        try {
          // Ensure the user is signed out from Google before signing in
          await GoogleSignin.signOut();
      
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
          // Get the user's ID token
          const { idToken } = await GoogleSignin.signIn();
      
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        } catch (error) {
          console.log('Error during Google Sign-In', error);
          return
        }
      }

      const signOut = async () => {
        try {
          await auth().signOut();
          setUser(null)
          console.log('User signed out!');
        } catch (error) {
          console.log('Sign out error', error);
          return
        }
      };

  return (
   <View>
    {user==null?
<Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then((res) =>{
        setUser(res)
         console.log('Signed in with Google!',res)})}
    />
:
<View>
   
<Text style={{
    marginBottom:20,
    textAlign:"center",
    fontSize:15,
    color:'black',
    fontWeight:'bold'
}}>
    
    {user?.additionalUserInfo?.profile?.name+"\n "+user?.additionalUserInfo?.profile?.email}

</Text>

<Button
      title="Google Sign-out"
      color={'red'}
      onPress={() =>signOut() }
    />
</View>

    }
   </View>
  )
}

export default App