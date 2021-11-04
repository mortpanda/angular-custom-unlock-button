var strResponse;
var arrLines;
var strMatchedPW;

function OktaWidget() {

    const oktaSignIn = new OktaSignIn({
        //logo: 'https://www.okta.com/sites/default/files/media/image/2021-03/Logo_Okta_Blue_RGB.png',
        language: 'en',
        colors: {
            brand: '#00297A'
        },
        i18n: {
            //Overrides default text when using English. Override other languages by adding additional sections.
            'en': {
                'primaryauth.title': 'Log In',
                'primaryauth.submit': 'Log In',
            }
        },
        features: {
            registration: true,                           // Enable self-service registration flow
            rememberMe: false,                             // Setting to false will remove the checkbox to save username
            router: true,
            selfServiceUnlock: true
        },
        baseUrl: "https://kent-nagao-test.oktapreview.com",
        // redirectUri: "",
        // clientId: "",   //CLIENT ID GOES HERE
        // authParams: {
        //     issuer: '',
        //     issuer: 'default',
        //     responseType: ['token', 'id_token'],
        //     strPkce: false,
        //     responseMode: 'fragment',
        //     display: 'page',
        //     scope: ['openid', 'email', 'profile']
        //},
    });

    oktaSignIn.on('afterRender', function (context) {
        document.getElementById("test_btn_div").style.visibility = 'hidden';
        document.getElementById("buttonTitle").style.visibility = 'hidden';
        
        console.log(context.controller);
        if (context.controller == 'account-unlock-email-sent') {

            document.getElementById('okta-signin-container').remove();
            document.getElementById("test_btn_div").style.visibility = 'visible';
            document.getElementById("buttonTitle").style.visibility = 'visible';
        }
    });



    if (oktaSignIn.token.hasTokensInUrl()) {
    } else {
        oktaSignIn.session.get(function (res) {
            // If we get here, the user is already signed in.
            if (res.status === 'ACTIVE') {
                return;
            }
            oktaSignIn.renderEl
                (
                    { el: '#okta-signin-container' },
                    function error(err) {
                        console.error(err);
                    }
                );
        });
    }

}

