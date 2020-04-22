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
      - type: view
        componentId: countryCodeContainer
        style:
          left: "0.121"
          top: "0.42"
          width: "0.2"
          height: "0.09"
        children:
          - type: label
            componentId: countryCodeLabel
            text: Country
            style:
              color: "0x300000058"
              left: "0"
              top: "0"
              width: "0.2"
              height: "0.041"
              fontSize: "12"
              textAlign: 
                x: center
                y: center
          - type: select
            componentId: countryCodeSelect
            contentType: countryCode
            style:
              left: "0"
              top: "0.045"
              width: "0.2"
              height: "0.041"
              fontSize: "14"
              placeholder: "US +1"
              border:
                style: "2"
                color: "0x00000058"
                width: "1"        
      - type: view
        componentId: phoneNumberContainer
        style:
          left: "0.3333"
          top: "0.42"
          width: "0.747"
          height: "0.09"
        children:
          - type: label
            componentId: phoneNumberLabel
            text: Phone
            style:
              color: "0x300000058"
              left: "0"
              top: "0"
              width: "0.483"
              height: "0.041"
              fontSize: "12"
          - type: textField
            componentId: phoneNumberTextField
            contentType: phoneNumber
            placeholder: "(555)123-4567"
            style:
              fontSize: "14"
              left: "0"
              top: "0.045"
              width: "0.483"
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
