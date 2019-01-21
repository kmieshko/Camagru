<ul>
    <?php if (isset($_SESSION['user'])): ?>
        <li><a href="/">Home</a></li>
        <li><a href="/user/logout">Logout</a></li>
    <?php endif; ?>
    <?php if (!isset($_SESSION['user'])): ?>
        <li><a href="/user/signup">Signup</a></li>
        <li><a href="/user/login">Login</a></li>
    <?php endif; ?>
</ul>
