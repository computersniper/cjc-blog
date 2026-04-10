<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 获取POST数据
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // 输出获取的数据
    echo "Name: " . htmlspecialchars($name) . "<br>";
    echo "Email: " . htmlspecialchars($email) . "<br>";
    echo "Message: " . htmlspecialchars($message) . "<br>";
} else {
    echo "No data submitted.";
}
?>