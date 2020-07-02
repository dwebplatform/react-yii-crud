<?php

namespace app\controllers;
use yii\web\Controller;
use app\models\Car;
use app\models\Person;
use yii\base\Exception;
use Yii;


class PersonController extends Controller {

    public function actionIndex(){
        try{

        
        $all_persons =  Person::find()->asArray()->all();
        
        if(!$all_persons){
            return json_encode(['error'=>true,
                                'message'=>'Не удалось найти записей'
            ]);
        }
        return json_encode([
            'error'=>false,
            'body'=> $all_persons]);
        }
        catch(\Exception $e){
                return json_encode(['error'=>true,
                'message'=>'']);
        }
        

    }
    /**
     * 
     * Редактирование текущей записи
     * */ 
    public function actionUpdate(){

        $request = Yii::$app->request;

        if($request->isPost){ // ждем пост запроса
            $id = (int)$request->post('id');
            $updatedPerson = Person::findOne([
                'id'=>$id
            ]);// находим конкрентную запись по id переданному от клиента

            // Обновляем записи
            $updatedPerson->name = $request->post('name');
            $updatedPerson->age = $request->post('age');
            // Сохраняем его
            $updatedPerson->save();
            //возвращаем json с измененными данными
            return json_encode([
                'error'=>false,
                'person'=>''
            ]);
        }

    }

// Удаляем запись
    public function actionDelete(){
        $request = Yii::$app->request;
        if($request->isPost){
            $id =  (int)$request->post('id');
            $deletedPerson = Person::findOne([
                'id'=>$id
            ]);
            // находим и удаляем по id
            $deletedPerson->delete();

            return json_encode(['error'=>false,
            'message'=>'the record has been deleted']);

        }
        return json_encode(['message'=>'not a GET request']);

    }
    // Добавляем нового персонажа
    public function actionAdd(){

        $request = Yii::$app->request;
        if($request->isPost){
            $newPeron = new Person();
            $newPeron->name = $request->post('name');
            $newPeron->age = $request->post('age');

            $newPeron->save();
            return json_encode(['error' => false,
            'body'=>$newPeron->attributes
            ]);
            
        }
        return json_encode(['message'=>'no GET method\'s provided']);
    }
    
    
    
}