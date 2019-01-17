<form method="post" action="/user/signup">
    <div>
        <label for="login">Login</label>
        <input type="text" name="login" placeholder="Login">
    </div>
    <div>
        <label for="login">Password</label>
        <input type="text" name="password" placeholder="Password">
    </div>
    <div>
        <label for="email">Email</label>
        <input type="text" name="email" placeholder="Email">
    </div>
    <div>
        <label for="notification">Would you like to receive notifications?</label>
        <input type="radio" name="notifications" value="no" checked>No
        <input type="radio" name="notifications" value="yes">Yes
    </div>
    <button type="submit">Sign Up</button>
</form>

