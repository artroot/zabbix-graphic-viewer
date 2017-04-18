# zabbix-graphic-viewer
Module on JavaScript which helps to display zabbix graphics and management it.
==========

## Add to your index ##
```
<link rel="stylesheet" type="text/css" href="css/graph.css">
<script type="text/javascript" src="js/graph_compress.js"></script>
```
## Example ##
Add the element where graphics will display:
```
<div id="graph_<Switch port or another identificator>"></div>
```
Create instance of a class Graphic with your JSON data:
```
<script>
var data = {
        'port' : <Switch port or another identificator, div element id must be as this one>,
        'period' : <Zabbix graphic period in seconds>,
        'stime' : <Start display time, for example (YYYYMMDDHHmmss): 20170418214112>,
        'width' : <Width of graphic image>,
        'height' : <Height of graphic image>,
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
*Some work screenshots:*

![alt text](http://i.piccy.info/i9/01340d3eaa7c41c444189d2c5f9597ee/1492542969/52312/1138734/Screenshot_105_.png "Hour") 
![alt text](http://i.piccy.info/i9/f8e92fa7c000926021ffec8b78e698db/1492543056/50742/1138734/Screenshot_106_.png "Day")  
![alt text](http://i.piccy.info/i9/830eb9b3b2279616b15b9a7bcbcd85cc/1492543093/56033/1138734/Screenshot_107_.png "Month") 
