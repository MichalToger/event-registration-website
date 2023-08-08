// Replace these values with your User Pool ID and App Client ID
var poolData = {
    UserPoolId: 'YOUR_USER_POOL_ID',
    ClientId: 'YOUR_APP_CLIENT_ID'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var username = document.getElementById('registerUsername').value;
        var email = document.getElementById('registerEmail').value;
        var password = document.getElementById('registerPassword').value;

        registerUser(username, email, password);
    });

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;

        loginUser(username, password);
    });
});

function registerUser(username, email, password) {
    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('User registration successful:', cognitoUser.getUsername());
    });
}

function loginUser(username, password) {
    var authenticationData = {
        Username: username,
        Password: password
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(session) {
            console.log('Login successful:', session);
            // Redirect to a dashboard or show a welcome message
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        }
    });
}
