/**
 * Created by art on 19.04.17.
 */

function Graphic(data, defaultMode) {
    if (data instanceof Object) {
        this.mode = (defaultMode == null ? 'hour' : defaultMode);
        this.autoLoad = true;
        this.modes = [
            {
                'name': 'Час',
                'mode': 'hour',
                'period': 3600
            },
            {
                'name': 'День',
                'mode': 'day',
                'period': 86400
            },
            {
                'name': 'Месяц',
                'mode': 'month',
                'period': 2592000
            }
        ];

        if (data.period == 'undefined' || data.period == null) this.period = this.modes[0].period;
        else this.period = data.period;

        this.stime = data.stime;
        this.graphids = data.graphids;
        this.port = data.port;
        this.width = ((data.width == 'undefined' || data.width  == null) ? 400 : data.width);
        this.height = ((data.height == 'undefined' || data.height  == null) ? 150 : data.height);
        this.zabbix_path = ((data.zabbix_path == 'undefined' || data.zabbix_path  == null) ? 'zabbix' : data.zabbix_path);

        this.source = document.getElementById('graph_' + this.port);
	this.source.className='zabbix-graphics';
    } else Console.error('No data!');

    this.getLnk = function (data) {
        var lnk = this.zabbix_path;
        data.forEach(function (item, i) {
            lnk = lnk + (i == 0 ? '?' : '&');
            lnk = lnk + item.name + '=' + item.value;
        });
        return lnk;
    };

    this.createControls = function () {
        var self = this;
        var controls = document.createElement('ul');
        controls.className = 'pagination';
        this.source.appendChild(controls);

        var back = document.createElement('li');
        var backLnk = document.createElement('a');
        var backContent = document.createElement('span');

        backLnk.href = 'javascript:void(0)';
        backLnk.setAttribute('mode', this.mode);
        backLnk.setAttribute('aria-label', 'Previous');
        backContent.innerHTML = '&laquo;';

        controls.appendChild(back);
        back.appendChild(backLnk);
        backLnk.appendChild(backContent);
        backLnk.onclick = function () {
            self.goBack(this);
        };

        var createdModesList = [];
        this.modes.forEach(function (modeObj) {
            var mode = document.createElement('li');
            var modeLnk = document.createElement('a');
            mode.className = (modeObj.mode == self.mode ? 'active' : '');
            mode.setAttribute('period', modeObj.period);
            mode.setAttribute('mode', modeObj.mode);
            modeLnk.href = 'javascript:void(0)';
            modeLnk.innerHTML = modeObj.name;
            controls.appendChild(mode);
            mode.appendChild(modeLnk);
            mode.onclick = function () {
                self.setMode(this);
            };
            createdModesList.push(mode);
        });

        var front = document.createElement('li');
        var frontLnk = document.createElement('a');
        var frontContent = document.createElement('span');

        frontLnk.href = 'javascript:void(0)';
        frontLnk.setAttribute('mode', this.mode);
        frontLnk.setAttribute('aria-label', 'Next');
        frontContent.innerHTML = '&raquo;';

        controls.appendChild(front);
        front.appendChild(frontLnk);
        frontLnk.appendChild(frontContent);
        frontLnk.onclick = function () {
            self.goFront(this);
        };
        this.controlElements = {
            'back': back,
            'front': front,
            'mods': createdModesList
        };
    };

    this.createGraphic = function () {
        self = this;

        if (this.stime == 'undefined' || this.stime == null){ this.stime = new Date().decDate(this.mode, 1); this.stime = this.stime.outNewDate(true); }

        this.graphics = [];
        var stime = new Date(this.stime);
        this.graphids.forEach(function (item) {
            var graphSpace = document.createElement('figure');
            var graph = document.createElement('img');
            graph.src = self.getLnk([
                {'name': 'graphid', 'value': item.graphid},
                {'name': 'period', 'value': self.period},
                {'name': 'stime', 'value': stime.incDate(self.mode, 0).outNewDateForZabbixFormat()},
                {'name': 'width', 'value': self.width},
                {'name': 'height', 'value': self.height}
            ]);
            graph.setAttribute('graphid', item.graphid);
            self.source.appendChild(graphSpace);
            graphSpace.appendChild(graph);
            self.graphics.push(graph);
        });
        this.stime = stime.outNewDate();
    };

    this.create = function () {
        this.createControls();
        var timer = document.createElement('p');
        timer.className = 'timer';
        timer.innerHTML = (this.autoLoad ? 30 : 0);
        this.source.appendChild(timer);
        this.createGraphic();
        this.timer = timer;
        setInterval(function () {
            if (self.autoLoad) {
                timer.innerHTML = timer.innerHTML - 1;
            } else {
                timer.innerHTML = 0;
            }
        }, 1000, timer);
        setInterval(function () {
            if (self.autoLoad) {
                timer.innerHTML = 30;
                var stime = new Date().decDate(self.mode, 1);
                self.graphics.forEach(function (item) {
                    item.setAttribute('src', self.getLnk([
                        {'name': 'graphid', 'value': item.getAttribute('graphid')},
                        {'name': 'period', 'value': self.period},
                        {
                            'name': 'stime', 'value': stime.outNewDateForZabbixFormat(true)
                        },
                        {'name': 'width', 'value': self.width},
                        {'name': 'height', 'value': self.height}
                    ]))
                });
                self.stime = stime.outNewDate(true);
            }
        }, 30000, self, timer);
    };

    this.setMode = function (element) {
        var self = this;
        this.autoLoad = false;
        this.mode = element.getAttribute('mode');
        this.period = element.getAttribute('period');
        this.controlElements.mods.forEach(function (item) {
            item.className = '';
        });

        element.className = 'active';
        this.controlElements.back.setAttribute('mode', this.mode);
        this.controlElements.front.setAttribute('mode', this.mode);

        var stime = new Date(this.stime);

        this.graphics.forEach(function (item) {
            item.setAttribute('src', self.getLnk([
                {'name': 'graphid', 'value': item.getAttribute('graphid')},
                {'name': 'period', 'value': self.period},
                {'name': 'stime', 'value': stime.incDate(self.mode, 0).outNewDateForZabbixFormat()},
                {'name': 'width', 'value': self.width},
                {'name': 'height', 'value': self.height}
            ]))
        });

        this.stime = stime.outNewDate();
    };

    this.goBack = function () {
        var self = this;
        var stime = new Date(this.stime);
        this.autoLoad = false;

        this.graphics.forEach(function (item) {
            item.setAttribute('src', self.getLnk([
                {'name': 'graphid', 'value': item.getAttribute('graphid')},
                {'name': 'period', 'value': self.period},
                {'name': 'stime', 'value': stime.decDate(self.mode, 1).outNewDateForZabbixFormat()},
                {'name': 'width', 'value': self.width},
                {'name': 'height', 'value': self.height}
            ]))
        });

        this.stime = stime.outNewDate();
    };

    this.goFront = function () {
        var self = this;
        var stime = new Date(this.stime).incDate(self.mode, 1);
        var stimeNow = new Date().incDate(this.mode, 0);

        var s_stime = stime.getYear() + ("0" + (stime.getUTCMonth() + 1)).slice(-2) + ("0" + stime.getUTCDate()).slice(-2) + ("0" + stime.getUTCHours()).slice(-2) + ("0" + stime.getUTCMinutes()).slice(-2);
        var s_stimeNow = stimeNow.getYear() + ("0" + (stimeNow.getUTCMonth() + 1)).slice(-2) + ("0" + stimeNow.getUTCDate()).slice(-2) + ("0" + stimeNow.getHours()).slice(-2) + ("0" + stimeNow.getUTCMinutes()).slice(-2);

        if (s_stime >= s_stimeNow) {
            this.timer.innerHTML = 30;
            this.autoLoad = true;
        } else {
            this.timer.innerHTML = 0;
            this.autoLoad = false;
            this.graphics.forEach(function (item) {
                item.setAttribute('src', self.getLnk([
                    {'name': 'graphid', 'value': item.getAttribute('graphid')},
                    {'name': 'period', 'value': self.period},
                    {'name': 'stime', 'value': stime.outNewDateForZabbixFormat()},
                    {'name': 'width', 'value': self.width},
                    {'name': 'height', 'value': self.height}
                ]))
            });

            this.stime = stime.outNewDate();
        }
    };

    Date.prototype.decDate = function (mode, value) {
        switch (mode) {
            case 'hour':
                this.setHours(this.getHours() - value);
                break;
            case 'day':
                this.setDate(this.getDate() - value);
                break;
            case 'month':
                this.setMonth(this.getMonth() - value);
                break;
        }
        return this;
    };

    Date.prototype.incDate = function (mode, value) {
        switch (mode) {
            case 'hour':
                this.setHours(this.getHours() + value);
                break;
            case 'day':
                this.setDate(this.getDate() + value);
                break;
            case 'month':
                this.setMonth(this.getMonth() + value);
                break;
        }
        return this;
    };


    Date.prototype.outNewDateForZabbixFormat = function (now) {
        return this.getUTCFullYear() +
            ("0" + (this.getUTCMonth() + 1)).slice(-2) +
            ("0" + this.getUTCDate()).slice(-2) +
            ("0" + (now ? this.getHours() : this.getUTCHours())).slice(-2) +
            ("0" + this.getUTCMinutes()).slice(-2) +
            ("0" + this.getUTCSeconds()).slice(-2);
    };

    Date.prototype.outNewDate = function (now) {
        return this.getUTCFullYear() + '-' +
            ("0" + (this.getUTCMonth() + 1)).slice(-2) + '-' +
            ("0" + this.getUTCDate()).slice(-2) + 'T' +
            ("0" + (now ? this.getHours() : this.getUTCHours())).slice(-2) + ':' +
            ("0" + this.getUTCMinutes()).slice(-2) + ':' +
            ("0" + this.getUTCSeconds()).slice(-2);
    };

}