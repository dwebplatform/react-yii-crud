<?php
use app\models\Car;
use yii\web\View;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

$form = ActiveForm::begin(
    [
        'id'=>'add-car-form'
    ]);

    echo $form->field($car,'name');
    echo $form->field($car,'price');
    echo Html::submitButton('Submit',['class'=>'btn btn-primary']);
    ActiveForm::end();