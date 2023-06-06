<?php
include 'database.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$action = $uri[3];

$database = new Database();
if($action === 'computers') {
    return_json(['computers' => $database->getComputers()]);
}
if($action === 'addcomputer') {
    return_json(['computer' => $database->addComputer()]);
}
if($action === 'deletecomputer') {
    return_json(['computer' => $database->deleteComputer()]);
}
if($action === 'updatecomputer') {
    return_json(['computer' => $database->updateComputer()]);
}
if($action === 'users') {
    return_json(['users' => $database->getUsers()]);
}
if($action === 'adduser' && $method='POST') {
    return_json(['user' => $database->addUser()]);
}
if($action === 'updateuser') {
    return_json(['user' => $database->updateUser()]);
}
if($action === 'deleteuser') {
    return_json(['user' => $database->deleteUser()]);
}
if($action === 'systems') {
    return_json(['systems' => $database->getSystems()]);
}
if($action === 'logs') {
    return_json(['logs' => $database->getLogs()]);
}



return_json(['status' => 0]);

function return_json($arr)
{
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:*');
    header("Access-Control-Allow-Method:'PUT,POST,GET,PATCH'");
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}