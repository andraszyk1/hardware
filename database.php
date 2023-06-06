<?php
class Database
{
    private $server_name = 'localhost';
    private $database_username = 'root';
    private $database_password = '';
    private $database_name = 'it_hardware_system';
    private $connection = null;
    private $selectComputers = "SELECT u.id as user_id,u.name as userName,u.rcp as userRcp,u.email as email, s.id as system_id,c.id as computer_id, c.name as computerName,c.sn as sn,c.typ as typ,c.model as model,c.ram as ram,c.wartosc as wartosc,c.aplications as aplications,c.owner as owner,s.name as systemName, c.created_at as created_at,c.updated_at as updated_at FROM `computers` as c left JOIN systems as s ON s.id=c.system_id LEFT join users as u ON u.id=c.user_id";

    public function connect()
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        return $this->connection;
    }

    public function insertLog($tabela, $id_tabeli, $akcja, $co, $kto)
    {
        $this->connect();
        $sql = $this->connection->prepare("INSERT INTO `logs` (`tabela`,`id_tabeli`, `akcja` ,`co`, `kto`) VALUES (?,?,?,?,?)");
        $sql->bind_param('sisss', $tabela, $id_tabeli, $akcja, $co, $kto);
        $sql->execute();
        $sql->close();
        $this->connection->close();
        return;
    }

    public function getComputers()
    {
        $this->connect();
        $sql = $this->connection->prepare($this->selectComputers . " ORDER BY c.created_at DESC");

        $sql->execute();
        $result = $sql->get_result();
        $items = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($items, $row);
            }
            $sql->close();
            $this->connection->close();
            return $items;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }

    public function getSystems()
    {
        $this->connect();
        $sql = $this->connection->prepare(
            'SELECT * FROM `systems` ORDER BY `systems`.`id` ASC'
        );

        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows > 0) {
            $items = [];
            while ($row = $result->fetch_assoc()) {
                array_push($items, $row);
            }
            $sql->close();
            $this->connection->close();
            return $items;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }

    public function getUsers()
    {
        $this->connect();
        $sql = $this->connection->prepare(
            'SELECT * FROM `users` ORDER BY `users`.`id` ASC'
        );

        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows > 0) {
            $items = [];
            while ($row = $result->fetch_assoc()) {
                array_push($items, $row);
            }
            $sql->close();
            $this->connection->close();
            return $items;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }

    public function addComputer()
    {
        $obj = json_decode(file_get_contents('php://input'));
        $this->connect();
        $sql = $this->connection->prepare(
            "INSERT INTO computers (name,sn,typ,model,ram,wartosc,system_id,user_id,owner,aplications,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
        );
        $created_at = date('Y-m-d H:i:s');
        $updated_at = date('Y-m-d H:i:s');
        $aplicationsString = json_encode($obj->aplications);
        $sql->bind_param('ssssiiiissss', $obj->computerName, $obj->sn, $obj->typ, $obj->model, $obj->ram, $obj->wartosc, $obj->system_id, $obj->user_id, $obj->owner, $aplicationsString, $created_at, $updated_at);

        if ($sql->execute()) {
            $last_id = $sql->insert_id;
            $sql_last_computer = $this->connection->prepare($this->selectComputers . " WHERE c.id=? ORDER BY c.created_at ASC");
            $sql_last_computer->bind_param('i', $last_id);
            $sql_last_computer->execute();
            $result = $sql_last_computer->get_result()->fetch_assoc();
            $this->insertLog('computers', $last_id, 'add', $obj->computerName, $obj->owner);
            return $result;
        } else {
            return [];
        }

        $sql->close();
        $this->connection->close();
    }
    public function addUser()
    {

        $obj = json_decode(file_get_contents('php://input'));

        $this->connect();
        $sql = $this->connection->prepare(
            "INSERT INTO users (name,login,email,rcp,dzial,owner,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)"
        );
        $created_at = date('Y-m-d H:i:s');
        $updated_at = date('Y-m-d H:i:s');
        $sql->bind_param(
            'ssssssss',
            $obj->name,
            $obj->login,
            $obj->email,
            $obj->rcp,
            $obj->dzial,
            $obj->owner,
            $created_at,
            $updated_at
        );


        if ($sql->execute()) {
            $last_id = $sql->insert_id;

            $sql_last = $this->connection->prepare("SELECT * FROM users WHERE id=?");
            $sql_last->bind_param('i', $last_id);
            $sql_last->execute();
            $result = $sql_last->get_result()->fetch_assoc();
            return $result;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }
    public function updateUser()
    {

        $obj = json_decode(file_get_contents('php://input'));
        $this->insertLog('users', $obj->id, 'update', $obj->name, $obj->updater);
        $this->connect();
        $sql = $this->connection->prepare(
            "UPDATE users SET name = ?,login=?,email=?,rcp=?,dzial=?,updated_at=? WHERE id = ?"
            // "INSERT INTO computers (name,system_id,user_id,owner,created_at,updated_at) VALUES(?,?,?,?,?,?)"
        );
        $updated_at = date('Y-m-d H:i:s');
        $sql->bind_param(
            'ssssssi',
            $obj->name,
            $obj->login,
            $obj->email,
            $obj->rcp,
            $obj->dzial,
            $updated_at,
            $obj->id
        );


        if ($sql->execute()) {
            $updated_id = $obj->id;
            $sql_last = $this->connection->prepare("SELECT * from users where id=?");
            $sql_last->bind_param('i', $updated_id);
            $sql_last->execute();
            $result = $sql_last->get_result()->fetch_assoc();
            return $result;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }
    public function updateComputer()
    {

        $obj = json_decode(file_get_contents('php://input'));
        $aplicationsString = json_encode($obj->aplications);
        $this->insertLog('computers', $obj->computer_id, 'update', $obj->computerName, $obj->updater);
        $this->connect();
        $sql = $this->connection->prepare(
            "UPDATE computers SET name = ?,sn=?,typ=?,model=?,ram=?,wartosc=?,system_id=?,user_id=?,updated_at=?,aplications=? WHERE id = ?"
            // "INSERT INTO computers (name,system_id,user_id,owner,created_at,updated_at) VALUES(?,?,?,?,?,?)"
        );
        $updated_at = date('Y-m-d H:i:s');
        $sql->bind_param(
            'ssssiiiissi',
            $obj->computerName,
            $obj->sn,
            $obj->typ,
            $obj->model,
            $obj->ram,
            $obj->wartosc,
            $obj->system_id,
            $obj->user_id,
            $updated_at,
            $aplicationsString,
            $obj->computer_id
        );


        if ($sql->execute()) {
            $updated_id = $obj->computer_id;
            $sql_last_computer = $this->connection->prepare($this->selectComputers . " WHERE c.id=? ORDER BY c.created_at DESC");
            $sql_last_computer->bind_param('i', $updated_id);
            $sql_last_computer->execute();
            $result = $sql_last_computer->get_result()->fetch_assoc();
            return $result;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }
    public function deleteUser()
    {

        $obj = json_decode(file_get_contents('php://input'));

        $this->connect();
        $sql = $this->connection->prepare(
            "DELETE FROM users WHERE id = ?"
        );
        $sql->bind_param('i', $obj->id);
        $sql->execute();

        $sql->close();
        $this->connection->close();
        return [];
    }
    public function deleteComputer()
    {

        $obj = json_decode(file_get_contents('php://input'));
        
        $this->insertLog('computers', $obj->id, 'delete', "", "");
        $this->connect();
        $sql = $this->connection->prepare(
            "DELETE FROM computers WHERE id = ?"
        );
        $sql->bind_param('i', $obj->computer_id);
        $sql->execute();

        $sql->close();
        $this->connection->close();
        return [];
    }
    public function getComputer($id)
    {
        $this->connect();
        $sql = $this->connection->prepare(
            'SELECT * FROM `computers` WHERE id=?'
        );
        $sql->bind_param('i', $id);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $computer = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $computer;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function getLogs()
    {
        $this->connect();
        $sql = $this->connection->prepare(
            'SELECT * FROM `logs` ORDER BY `logs`.`id` ASC'
        );

        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows > 0) {
            $items = [];
            while ($row = $result->fetch_assoc()) {
                array_push($items, $row);
            }
            $sql->close();
            $this->connection->close();
            return $items;
        }
        $sql->close();
        $this->connection->close();
        return [];
    }
}
