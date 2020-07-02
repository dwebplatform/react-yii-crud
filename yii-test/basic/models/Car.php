<?php
namespace app\models;

use yii\db\ActiveRecord;


class Car extends ActiveRecord {
    

    public static function tableName(){
        return '{{%cars}}';
    }
    public function getDrivers(){
        return $this->hasMany( Driver::className(),['CarId'=>'id']);
    }

}
class Driver extends ActiveRecord {
    public static function tableName(){
        return '{{%drivers}}';
    }
    public function getCar()
    {
        return $this->hasOne(Car::className(), ['id' => 'CarId']);
    }
}