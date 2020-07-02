<?php
namespace app\controllers;
use yii\web\Controller;
use app\models\Car;
use yii\base\Exception;
use Yii;

class CarController extends Controller{
    public function actionIndex($id=''){
        
        
        
        
    }

    public function actionPostcar(){
        $request =Yii::$app->request;
        if( $request->isPost){
            $name = $request->post('name');
            $age = $request->post('age');
            return json_encode(['data'=>[
                'name'=>$name,
                'age'=>$age
            ]]);

        }

        return json_encode(['hello'=>'World']);
    }

    
}



/*
 $request =Yii::$app->request;
        if(Yii::$app->request->isPost){

            $name = $request->post('name');
            $age = $request->post('age');
            return json_encode([
                'name' =>$name,
                'age' => $age,
            ]);
        }
        if($request->get('id')){
            $car = Car::find()->where(['id'=>(int)$id])->asArray()->one();
            return json_encode(['data'=> $car]);
        }
        $cars = Car::find()->asArray()->all();
        
        return json_encode(['data'=>$cars]);

        */