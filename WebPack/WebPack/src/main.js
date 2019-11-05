
import $ from '../scripts/jquery-1.10.2.min.js';
//webconfig中配置过 所以可以直接通过es6导入模块
import './style/index.css';
import h from '@/js/test.js';
import img from './images/1.png';
$(function () {
    $('li:odd').css('backgroundColor', 'blue')
    $('li:even').css('backgroundColor', 'red')
    document.getElementById('div1').className = 'box' 
})