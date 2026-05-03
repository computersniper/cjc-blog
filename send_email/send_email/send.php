<?php
header('Content-Type: application/json');
http_response_code(410);

echo json_encode([
    'status' => 'error',
    'message' => 'The PHP email endpoint has been migrated to the FastAPI /contact/send endpoint.'
]);
?>
