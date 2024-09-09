<?php
// upload.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'];
    $data = $_POST['data'];

    $filePath = __DIR__ . "/{$type}.json";

    if (is_string($data)) {
        $data = json_decode($data, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT))) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao salvar os dados']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao decodificar os dados JSON']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Os dados enviados não estão em formato JSON']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
