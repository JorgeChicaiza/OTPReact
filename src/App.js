import React from 'react'
import firebase from './firebase'
class App extends React.Component{
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }

  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();  
       // console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+593" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP ha sido enviado")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS no enviado")
        });
  }

  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("Usuario Verificado")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
render(){
  return(
    <div>
      <h2>Autentificación</h2>
     <form onSubmit={this.onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input type="number" name="mobile" placeholder="Número de Teléfono" required onChange={this.handleChange}/> 
        <button type="submit">Submit</button>
      </form>
      <h2>Ingrese OTP</h2>
        <form onSubmit={this.onSubmitOTP}>
          <input type="number" name="otp" placeholder="Código OTP" required onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}
}

export default App
