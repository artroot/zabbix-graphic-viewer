# zabbix-graphic-viewer
#### Module on JavaScript which helps to display zabbix graphics and to manage it in your app.

- Hour, day and month modes;
- Back or front time control;
- Auto update.

### Add to your index ##
```HTML
<link rel="stylesheet" type="text/css" href="css/graph.css">
<script type="text/javascript" src="js/graph_compress.js"></script>
```
### Example ##
Add the element where graphics will display:
```HTML
<div id="graph_<Switch port or another uniq identificator>"></div>
```
Create instance of a class Graphic with your JSON data:
```javascript
<script>
var data = {
        'port' : <Switch port or another uniq identificator, div element id must be as this one>,
        'period' : <Zabbix graphic period in seconds>,
        'stime' : <Start display time, for example (YYYYMMDDHHmmss): 20170418214112>,
        'width' : <Width of graphic image>,
        'height' : <Height of graphic image>,
        'zabbix_path' : <Zabbix api controller/action path>,
        'graphids' : [
          {
              'graphid' : <Zabbix graphic identificator>
          }
          ...
        ]
};

var graph = new Graphic(data);
graph.create();
</script>
```
The script will add the next structure into div body: 
```HTML
<div id="graph_1" class="zabbix-graphics">
        <ul class="pagination">
                <li mode="hour">
                        <a href="javascript:void(0)" mode="hour" aria-label="Previous">
                                <span>«</span>
                        </a>
                </li>
                <li class="active" period="3600" mode="hour">
                        <a href="javascript:void(0)">Час</a>
                </li>
                <li class="" period="86400" mode="day">
                        <a href="javascript:void(0)">День</a>
                </li>
                <li class="" period="2592000" mode="month">
                        <a href="javascript:void(0)">Месяц</a>
                </li>
                <li mode="hour">
                        <a href="javascript:void(0)" mode="hour" aria-label="Next">
                                <span>»</span>
                        </a>
                </li>
        </ul>
        <p class="timer">0</p>
        <figure>
                <img src="zabbix?graphid=12782&amp;period=3600&amp;stime=20170418210829&amp;width=400&amp;height=150" graphid="12782">
        </figure>
</div>
```


*Some work screenshots:*

![alt text](http://i.piccy.info/i9/11fde9dfcd7689effe05c46226f44f71/1492582907/51366/1138734/Screenshot_105_.png "Hour Mode") 
![alt text](http://i.piccy.info/i9/ea2a18f352a3a27e70356249e88470b7/1492582956/50153/1138734/Screenshot_106_.png "Day Mode")  
![alt text](http://i.piccy.info/i9/262b84ae31964b61268480ae6c4ba5f7/1492582986/55370/1138734/Screenshot_107_.png "Month Mode") 
