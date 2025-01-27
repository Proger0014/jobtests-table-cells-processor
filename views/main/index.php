<?php

/** @var yii\web\View $this */

?>

<div id="root"></div>

<?= \yii\bootstrap5\ButtonGroup::widget([
    'buttons' => [
        ['label' => 'btn 1', 'options' => ['id' => 'btn1', 'class' => 'btn-secondary']],
        ['label' => 'btn 2', 'options' => ['id' => 'btn2', 'class' => 'btn-primary']],
        ['label' => 'btn 3', 'options' => ['id' => 'btn3', 'class' => 'btn-secondary']],
    ]
]) ?>