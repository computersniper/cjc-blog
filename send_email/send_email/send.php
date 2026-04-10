<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer();

$mail->isSMTP();                          // 使用SMTP服务
$mail->CharSet = "utf8";
$mail->Host = "smtphz.qiye.163.com";             // 发送方的SMTP服务器地址
$mail->SMTPAuth = true;// 是否使用身份验证
$mail->Username = "contact@caijiechao.com";   // 发送方的163邮箱用户名
$mail->Password = "Cai875690";                // 发送方的邮箱授权码
$mail->SMTPSecure = "ssl";                // 使用ssl协议方式
$mail->Port = 465;                        // 163邮箱的ssl协议方式端口号是465/994

$mail->setFrom("contact@caijiechao.com","caijiechao");     // 设置发件人信息
$mail->addAddress("2651159710@qq.com","");        // 设置收件人信息，可设置多个，复制粘贴此行修改邮箱地址即可
$mail->addReplyTo("contact@caijiechao.com","Reply");   // 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
//$mail->addCC("evolraelc9@163.com");    // 设置邮件抄送人，可以只写地址，上述的设置也可以只写地址
//$mail->addBCC("bbbb@163.com");         // 设置秘密抄送人
//$mail->addAttachment("bug0.jpg");      // 添加附件

$mail->Subject = "网页收到新留言啦~~";          // 邮件标题
$mail->Body = "姓名：".$_POST['name']."\n".
              "邮件：".$_POST['email']."\n".
              "电话：".$_POST['phone']."\n".
              "主题：".$_POST['subject']."\n".
              "内容：".$_POST['comments'];      // 邮件正文

if(!$mail->send()){// 发送邮件
    echo "Message could not be sent.";
    echo "Mailer Error: ".$mail->ErrorInfo;  // 输出错误信息
}else{
    echo 'Message has been sent.';
}
?>