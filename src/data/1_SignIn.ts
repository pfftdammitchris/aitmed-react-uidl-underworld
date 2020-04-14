export default `
pageName: SignIn
components:
  - type: view
    componentId: bodyContainer
    style:
      left: "0"
      top: "0"
      width: "1"
      height: "1"
    children:
      - type: image
        componentId: bodyBackgroundImage
        path: signInBackground.png
        style:
          left: "0"
          top: "0"
          width: "1"
          height: "1"
      - type: image
        componentId: aitmedLogoImage
        path: aitmedLogo.png
        style:
          left: "0.396"
          top: "0.21"
          width: "0.261"
          height: "0.122"
      - type: label
        componentId: signInLabel01
        text: Sign in to your account
        style:
          color: "0x3185c7ff"
          left: "0.147"
          top: "0.357"
          width: "0.72"
          height: "0.041"
          fontSize: "16"
          textAlign: 
            x: center
            y: center
      - type: textField
        componentId: phoneNumberTextField
        contentType: phoneNumber
        placeholder: Phone Number
        style:
          fontSize: "14"
          left: "0.134"
          top: "0.470"
          width: "0.747"
          height: "0.041"
          border:
            style: "2"
      - type: textField
        componentId: passwordTextField
        contentType: password
        placeholder: Password
        style:
          fontSize: "14"
          left: "0.134"
          top: "0.554"
          width: "0.747"
          height: "0.041"
          border:
            style: "2"
      - type: view
        componentId: signInContainer
        style:
          left: "0.359"
          top: "0.7"
          width: "0.406"
          height: "0.06"
        children:
          - type: label
            componentId: signInLabel02
            text: Sign in
            style:
              fontSize: "19"
              fontStyle: bold
              left: "0"
              top: "0"
              width: "0.2"
              height: "0.06"
          - type: button
            componentId: signInButton
            path: signIn.png
            onClick: signIn
            style:
              backgroundColor: "0x3185c7ff"
              left: "0.267"
              top: "0"
              width: "0.235"
              height: "0.06"
              border:
                style: "5"
              borderRadius: "15"
      - type: view
        componentId: signUpContainer
        style:
          left: "0.134"
          top: "0.89"
          width: "0.752"
          height: "0.054"
        children:
          - type: label
            componentId: noAccountLabel
            text: Don't have an account?
            style:
              fontSize: "12"
              left: "0"
              top: "0"
              width: "0.5"
              height: "0.054"
          - type: button
            componentId: signUpButton
            text: Sign Up
            style:
              color: "0x3185c7ff"
              fontSize: "12"
              left: "0.48"
              top: "0"
              width: "0.25"
              height: "0.054"
            onClick: goToSignUp
`
