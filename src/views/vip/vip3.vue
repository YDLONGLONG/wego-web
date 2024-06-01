<template>
    <div>
        <div class="body" :style="{ backgroundImage: 'url(' + itemImg + ')' }"></div>

        <el-dialog title="抽取塔罗牌" :visible.sync="thingDialogVisible" width="70%" center>
            <div style="text-align: center;">
                <h1>{{ thing[random][0] }}</h1>
                <h2>{{ thing[random][1] }}</h2>
                <el-image style="width: 300px; height: 500px" :src="require('../../assets/' + thing[random][0] + '.jpeg')">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="centerDialogVisible" width="30%" center :before-close="handleClose">
            <span>{{ content || "无线索" }}</span>
            <el-image :src="require('../../assets/boss.jpeg')" v-show="bossImg">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeThing(content, 0)">拒绝</el-button>
                <el-button @click="closeThing(content, 1)">同意</el-button>
            </span>
        </el-dialog>

        <el-dialog width="80%" :title="currentRoom[0]" :visible.sync="outerVisible">
            <div class="grid-content">
                <el-card v-for="(item, index) in currentRoom[1]" :key="index">
                    <template>
                        <span style="cursor: pointer;" @click="openSay(item)">{{ item }}</span>
                    </template>
                </el-card>
            </div>
            <div class="grid-content">
                <el-card v-for="(item, index) in currentRoom[2]" :key="index">
                    <template>
                        <span style="cursor: pointer;" @click="openThing(item)">{{ item }}</span>
                    </template>
                </el-card>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="innerVisible = true">打开背包</el-button>
            </div>
        </el-dialog>

        <el-dialog width="80%" title="背包" :visible.sync="innerVisible">
            <div class="grid-content">
                <el-card v-for="(item, index) in bag" :key="index">
                    <template>
                        <span style="cursor: pointer;" @click="useGood(item)">{{ item }}</span>
                    </template>
                </el-card>
            </div>
        </el-dialog>

        <el-dialog width="80%" title="使用物品" :visible.sync="goodVisible">
            <div class="grid-content">
                <el-card v-for="(item, index) in currentRoom[1]" :key="index">
                    <template>
                        <span style="cursor: pointer;" @click="useGoodToPerson(item)">{{ item }}</span>
                    </template>
                </el-card>
            </div>
        </el-dialog>

        <el-drawer title="规则怪谈" :visible.sync="drawer" direction="rtl">
            <p v-for="(item, index) in words[1]" :key="index">{{ item }}</p>
        </el-drawer>

        <el-dialog :title="currentPerson" :visible.sync="dialogVisible" width="30%" top="70vh" :modal="false"
            :show-close="false">
            <span>{{ word }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="text" @click="nextWord()">对话</el-button>
            </span>
        </el-dialog>

        <el-container>
            <el-header>
                <h1 style="color: white;">第二幕 第{{ chapter }}章</h1>
                <h2 style="color: white;">当前场景:{{ site[0] }}</h2>
            </el-header>
            <el-container>
                <el-aside width="15%">
                    <el-button @click="innerVisible = true" :disabled="bagDisabled">打开背包</el-button>
                    <el-card style="margin: 2%;">
                        <el-statistic title="所在位置">
                            <template slot="suffix">
                                {{ currentRoom[0] || site[0] }}
                            </template>
                        </el-statistic>
                    </el-card>
                    <el-card style="margin: 2%;">
                        <el-statistic title="当前事件">
                            <template slot="suffix">
                                {{ currentThing[0] }}
                                {{ currentThing[1] }}
                            </template>
                        </el-statistic>
                    </el-card>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content">
                                <el-card v-for="(item, index) in site[3]" :key="index">
                                    <template v-for="(item1) in item[0]">
                                        <span @click="openOuterVisible(item)" style="cursor: pointer;">{{ item1 }}</span>
                                    </template>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content">
                                <el-card v-for="(item, index) in site[1]" :key="index">
                                    <template>
                                        <span style="cursor: pointer;" @click="openSay(item)">{{ item }}</span>
                                    </template>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content">
                                <el-card v-for="(item, index) in site[2]" :key="index">
                                    <template>
                                        <span style="cursor: pointer;" @click="openThing(item)">{{ item }}</span>
                                    </template>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
                <el-aside width="15%">
                    <el-button @click="drawer = true">规则怪谈</el-button>
                    <el-card style="margin: 2%;">
                        <el-statistic title="当前时间">
                            <template slot="suffix">
                                {{ deadline | formatDate }}
                            </template>
                        </el-statistic>
                    </el-card>
                    <el-card style="margin: 2%;">
                        <el-statistic title="当前任务">
                            <template slot="suffix">
                                {{ currentTask }}
                            </template>
                        </el-statistic>
                    </el-card>
                    <el-card style="margin: 2%;" v-show="deadline2 !== 0">
                        <el-statistic :value="deadline2" time-indices title="倒计时">
                            <template slot="suffix">
                                马上躲进厕所
                            </template>
                        </el-statistic>
                    </el-card>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import { site1, say1, word1, thing2 } from '@/utils/index.js';
export default {
    data() {
        return {
            site: site1[0],
            thing: thing2,
            say: say1,
            words: word1[0],
            dialogVisible: false,
            outerVisible: false,
            innerVisible: false,
            centerDialogVisible: false,
            goodVisible: false,
            drawer: false,
            thingDialogVisible: false,
            currentRoom: "",
            currentPerson: "",
            currentTask: "",
            currentGood: "",
            currentThing: [],
            sayIndex: 0,
            thingIndex: 0,
            SPIndex: 0,
            deadline: new Date(2024, 1, 1, 8, 0, 0),
            deadline2: 0,
            bag: [],
            bagDisabled: false,
            content: "",
            word: "",
            bossImg: false,
            setTime: null,
            chapter: 1,
            itemImg: require('../../assets/火车站.jpeg'),
            random: 0,
        };
    },
    methods: {
        handleClose() {
            return this.$message.info('请选择');
        },
        openOuterVisible(item) {
            this.outerVisible = true;
            this.currentRoom = item;
        },
        openSay(item) {
            this.dialogVisible = true;
            this.currentPerson = item;
            this.sayIndex = 0;
        },
        openThing(item) {
            this.currentRoom = [item];
            this.centerDialogVisible = true;
            if (this.site[0] == "列车站") {
                if (item == "保安室") {
                    this.content = "余下的规则:3.厕所开放时间:10:00-16:00,其他时间请不要进入厕所。4.18:00之后不要和售票员讲话直到第二天";
                    if (this.words[1].length == 2) {
                        this.words[1].push("3.厕所开放时间:10:00-16:00,其他时间请不要进入厕所", "4.18:00之后不要和售票员讲话直到第二天")
                    }
                } else if (item == "售票员") {
                    this.content = this.say[1][2];
                    this.bossImg = true;
                    this.outerVisible = false;
                } else if (item == "服务台") {
                    this.content = "获得宣传单";
                    this.bag.indexOf("宣传单") == -1 ? this.bag.push("宣传单") : "";
                    this.outerVisible = false;
                } else if (item == "座位2" && this.word == "你的票在座位2下面") {
                    this.content = "获得遗失的车票";
                    this.bag.indexOf("车票") == -1 ? this.bag.push("车票") : "";
                    this.outerVisible = false;
                }
            } else if (this.site[0] == "列车") {
                if (item == "路人1") {
                    this.content = "路人1给你一个黑团团的东西,是否接受?";
                } else if (item == "路人1x" && this.SPIndex == 0) {
                    this.content = this.say[6][2];
                    this.bossImg = true;
                } else if (item == "路人1xx" && this.SPIndex == 0) {
                    this.content = "那我就只能吃你了";
                    this.bossImg = true;
                } else if (item == "售票员" && this.SPIndex == 0) {
                    this.content = this.say[1][2];
                    this.bossImg = true;
                    this.outerVisible = false;
                } else if (item == "倒吊人" || item == "恶魔") {
                    this.content = "鬼魂出来猎杀";
                    this.bossImg = true;
                    this.outerVisible = false;
                } else if ((item == "售票员" || item == "路人1x") && this.SPIndex == 1) {
                    this.content = "审判为你抵挡了一次伤害";
                    this.centerDialogVisible = true;
                    this.outerVisible = false;
                    this.SPIndex = 0;
                } else if ((item == "售票员" || item == "路人1x") && this.SPIndex == 2) {
                    this.content = "鬼魂注视着你,但是没有攻击";
                    this.centerDialogVisible = true;
                    this.outerVisible = false;
                    this.SPIndex = 0;
                } else if (item == "座位5") {
                    this.content = "发现了一瓶安眠药";
                } else if (item == "座位8") {
                    this.content = "发现了一跟针管";
                } else if (item == "座位11") {
                    this.content = "发现了一把水果刀";
                }
            }
        },
        closeThing(item, index) {
            this.bossImg = false;
            this.content = "";
            this.centerDialogVisible = false;
            this.outerVisible = false;
            if (item == "[你违反了规则]你往哪走啊?" || item == "[你违反了规则]我让你拿着!" || item == "鬼魂出来猎杀") {
                this.nextChapter();
            } else if (item == "路人1给你一个黑团团的东西,是否接受?" && index == 1) {
                this.bag.indexOf("黑色塑料袋") == -1 ? this.bag.push("黑色塑料袋") : "";
                this.content = "获得黑色塑料袋";
                this.centerDialogVisible = true;
            } else if (item == "路人1给你一个黑团团的东西,是否接受?" && index == 0) {
                this.openThing("路人1x");
            } else if (item == "蓝色制服服务员:先生,正在进行二次检票,能出示一下证件吗" && index == 1) {
                this.bag.indexOf("塔罗牌") == -1 ? this.bag.push("塔罗牌") : "";
                this.content = "获得塔罗牌";
                this.centerDialogVisible = true;
                this.thingIndex = 1;
            } else if (item == "蓝色制服服务员:先生,正在进行二次检票,能出示一下证件吗" && index == 0) {
                this.content = "你拒绝了,似乎损失了什么东西";
                this.centerDialogVisible = true;
                this.thingIndex = 1;
            } else if (item == "红色制服服务员:先生,本车提供美味的卤煮,来一份吗" && index == 0) {
                this.openThing("路人1x");
            } else if (item == "红色制服服务员:先生,本车提供美味的卤煮,来一份吗" && index == 1) {
                this.bag.indexOf("卤煮") == -1 ? this.bag.push("卤煮") : "";
                this.content = "获得一份卤煮";
                this.centerDialogVisible = true;
                this.thingIndex = 2;
            } else if (item == "路人1:好饿啊,你那里有没有吃的(是否将卤煮给路人1)" && index == 0) {
                this.openThing("路人1xx");
                this.thingIndex = 3;
            } else if (item == "路人1:好饿啊,你那里有没有吃的(是否将卤煮给路人1)" && index == 1) {
                if (this.bag.indexOf("卤煮") !== -1) {
                    this.bag.splice(this.bag.indexOf("卤煮"), 1);
                }
                this.content = "路人1狼吞虎咽的吃了起来";
                this.centerDialogVisible = true;
                this.thingIndex = 3;
            }
        },
        useGood(item) {
            this.goodVisible = true;
            this.currentGood = item;
            if (item == "塔罗牌") {
                this.goodVisible = false;
                this.thingDialogVisible = true;
                this.currentThing = [this.thing[this.random][0], this.thing[this.random][1]];
                this.useTLP(this.thing[this.random][0]);
            }
        },
        useGoodToPerson(item) {
            if (item == "路人4" && this.currentGood == "宣传单") {
                if (confirm("确定要给" + item + "吗？")) {
                    this.word = "你就拿这个给我？";
                    this.dialogVisible = true;
                }
            } else if (item == "路人4" && this.currentGood == "戒指") {
                if (confirm("确定要给" + item + "吗？")) {
                    this.word = "你的票在座位2下面";
                    this.dialogVisible = true;
                    if (this.bag.indexOf("戒指") !== -1) {
                        this.bag.splice(this.bag.indexOf("戒指"), 1);
                    }
                }
            } else if (item == "售票员" && this.currentGood == "车票") {
                if (confirm("确定要给" + item + "吗？")) {
                    this.word = "检票通过,请上车";
                    this.dialogVisible = true;
                    this.chapter++;
                    this.nextChapter();
                }
            } else if (item == "服务员" && this.currentGood == "黑色塑料袋") {
                if (confirm("确定要给" + item + "吗？")) {
                    this.word = "你在垃圾中发现了一张残缺纸条";
                    this.dialogVisible = true;
                    this.innerVisible = false;
                    if (this.bag.indexOf("黑色塑料袋") !== -1) {
                        this.bag.splice(this.bag.indexOf("黑色塑料袋"), 1);
                    }
                    if (this.words[1].length == 4) {
                        this.words[1].push("5.20:00之后不要吃东西", "6.22:00之后不要和任何人讲话")
                    }
                }
            } else if (item == "路人6" && this.currentGood == "指认凶手") {
                if (confirm("确定要给" + item + "吗？")) {
                    this.word = "指认成功,凶手已找到。真相:路人6用针管向路人1注射药物。路人6供出路人8主谋,提供药物煽动其行动并嫁祸给路人3";
                    this.dialogVisible = true;
                    this.chapter++;
                    this.nextChapter();
                }
            }
        },
        useTLP(item) {
            if (item == "倒吊人" || item == "恶魔") {
                setTimeout(() => {
                    this.openThing(item);
                }, 3000);
            } else if (item == "命运之轮") {
                this.nextChapter();
            } else if (item == "死神") {
                this.deadline2 = Date.now() + 1000 * 30;
                setTimeout(() => {
                    if (this.currentRoom[0] == "厕所") {
                        this.content = "死神没找到你,躲过了一劫";
                        this.centerDialogVisible = true;
                        this.deadline2 = 0;
                    } else if (this.currentRoom[0] !== "厕所") {
                        this.openThing("售票员");
                        this.deadline2 = 0;
                    }
                }, 1000 * 31);
            } else if (item == "太阳") {
                clearInterval(this.setTime);
                let gapTime = 8;
                this.setTime = setInterval(() => {
                    this.deadline = new Date(2024, 1, 1, gapTime, 0, 0);
                    gapTime++;
                    this.isNext();
                }, 1000 * 5);
            } else if (item == "月亮") {
                clearInterval(this.setTime);
                let gapTime = 18;
                this.setTime = setInterval(() => {
                    this.deadline = new Date(2024, 1, 1, gapTime, 0, 0);
                    gapTime++;
                    this.isNext();
                }, 1000 * 5);
            } else if (item == "恋人") {
                clearInterval(this.setTime);
                let gapTime = this.random;
                this.setTime = setInterval(() => {
                    this.deadline = new Date(2024, 1, 1, gapTime, 0, 0);
                    gapTime++;
                    this.isNext();
                }, 1000 * 5);
            } else if (item == "星星") {
                this.random = Math.round(Math.random() * this.thing.length - 1);
                this.useGood("塔罗牌");
            } else if (item == "审判") {
                this.SPIndex = 1;
            } else if (item == "灯塔") {
                this.SPIndex = 2;
            } else if (item == "力量") {
                this.bag.indexOf("魔镜") == -1 ? this.bag.push("魔镜") : "";
                this.content = "获得魔镜,显现鬼魂当前所在位置";
                this.centerDialogVisible = true;
            } else if (item == "世界") {
                this.words[1].shift();
            } else if (item == "节制") {
                this.bagDisabled = true;
            }
            this.innerVisible = false;
        },
        nextWord() {
            if (this.word == "你的票在座位2下面") return;
            this.sayIndex++;
        },
        isNext() {
            if (this.site[0] == "列车站") {
                this.currentTask = "找到完整规则";
                if (this.words[1].length == 4 && this.bag.indexOf("车票") == -1) {
                    this.currentTask = "找到丢失的票";
                } else if (this.bag.indexOf("车票") !== -1) {
                    this.currentTask = "向售票员检票,准备出发";
                }
            }
            if (this.site[0] == "列车") {
                this.currentTask = "找到完整规则";
                if(this.thingIndex == 4){
                    this.currentTask = "找出凶手";
                    this.bag.indexOf("指认凶手") == -1 ? this.bag.push("指认凶手") : "";
                }else if (this.words[1].length == 6) {
                    this.currentTask = "存活到站";
                }
            }
        },
        nextChapter() {
            if (this.chapter == 1) {
                this.site = site1[0];
                this.words = word1[0];
                this.itemImg = require('../../assets/火车站.jpeg');
                this.random = Math.round(Math.random() * this.thing.length - 1);
            } else if (this.chapter == 2) {
                this.site = site1[1];
                this.words = word1[1];
                this.itemImg = require('../../assets/火车.jpeg');
                this.bag = ["车票"];
                this.random = Math.round(Math.random() * this.thing.length - 1);
                this.bagDisabled = false;
            }
        }
    },
    watch: {
        currentPerson(newVal, oldVal) {
            if (this.site[0] == "列车站") {
                if (newVal == "保安") {
                    this.word = this.say[0][1][0];
                } else if (newVal == "售票员") {
                    this.word = this.say[1][1][0];
                } else if (newVal == "路人1") {
                    this.word = this.say[2][1][0];
                } else if (newVal == "路人2") {
                    this.word = this.say[3][1][0];
                } else if (newVal == "路人4") {
                    this.word = this.say[4][1][0];
                } else if (newVal == "路人5") {
                    this.word = this.say[5][1][0];
                }
            } else if (this.site[0] == "列车") {
                if (newVal == "路人1") {
                    this.word = this.say[6][1][0];
                } else if (newVal == "服务员") {
                    this.word = this.say[7][1][0];
                } else if (newVal == "列车员") {
                    this.word = this.say[8][1][0];
                } else if (newVal == "路人11") {
                    this.word = this.say[9][1][0];
                } else if (newVal == "路人2" && this.thingIndex==4) {
                    this.word = this.say[10][1][0];
                } else if (newVal == "路人3" && this.thingIndex==4) {
                    this.word = this.say[11][1][0];
                } else if (newVal == "路人4" && this.thingIndex==4) {
                    this.word = this.say[12][1][0];
                } else if (newVal == "路人5" && this.thingIndex==4) {
                    this.word = this.say[13][1][0];
                } else if (newVal == "路人6" && this.thingIndex==4) {
                    this.word = this.say[14][1][0];
                } else if (newVal == "路人7" && this.thingIndex==4) {
                    this.word = this.say[15][1][0];
                } else if (newVal == "路人8" && this.thingIndex==4) {
                    this.word = this.say[16][1][0];
                } else if (newVal == "路人9" && this.thingIndex==4) {
                    this.word = this.say[17][1][0];
                } else if (newVal == "路人10" && this.thingIndex==4) {
                    this.word = this.say[18][1][0];
                }
            }
        },
        sayIndex(newVal, oldVal) {
            if (this.site[0] == "列车站") {
                if (this.currentPerson == "保安") {
                    if (this.say[0][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[0][1][newVal];
                } else if (this.currentPerson == "售票员") {
                    if (this.say[1][1][newVal] == null) {
                        this.dialogVisible = false;
                        if (this.deadline.getHours() > new Date(2024, 1, 1, 18, 0, 0).getHours()) {
                            this.openThing("售票员");
                        }
                    }
                    this.word = this.say[1][1][newVal];
                } else if (this.currentPerson == "路人1") {
                    if (this.say[2][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[2][1][newVal];
                } else if (this.currentPerson == "路人2") {
                    if (this.say[3][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[3][1][newVal];
                } else if (this.currentPerson == "路人4") {
                    if (this.say[4][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[4][1][newVal];
                } else if (this.currentPerson == "路人5") {
                    if (this.say[5][1][newVal] == null) {
                        this.dialogVisible = false;
                        if (this.deadline.getHours() > 16 || this.deadline.getHours() < 10) {
                            this.openThing("售票员");
                        }
                    }
                    this.word = this.say[5][1][newVal];
                    this.bag.indexOf("戒指") == -1 ? this.bag.push("戒指") : "";
                }
            } else if (this.site[0] == "列车") {
                if (this.currentPerson == "路人1") {
                    if (this.say[6][1][newVal] == null) {
                        this.dialogVisible = false;
                        this.openThing("路人1");
                    }
                    this.word = this.say[6][1][newVal];
                } else if (this.currentPerson == "服务员") {
                    if (this.say[7][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[7][1][newVal];
                } else if (this.currentPerson == "列车员") {
                    if (this.say[8][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[8][1][newVal];
                } else if (this.currentPerson == "路人11") {
                    if (this.say[9][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[9][1][newVal];
                } else if (this.currentPerson == "路人2" && this.thingIndex==4) {
                    if (this.say[10][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[10][1][newVal];
                } else if (this.currentPerson == "路人3" && this.thingIndex==4) {
                    if (this.say[11][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[11][1][newVal];
                } else if (this.currentPerson == "路人4" && this.thingIndex==4) {
                    if (this.say[12][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[12][1][newVal];
                } else if (this.currentPerson == "路人5" && this.thingIndex==4) {
                    if (this.say[13][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[13][1][newVal];
                } else if (this.currentPerson == "路人6" && this.thingIndex==4) {
                    if (this.say[14][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[14][1][newVal];
                } else if (this.currentPerson == "路人7" && this.thingIndex==4) {
                    if (this.say[15][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[15][1][newVal];
                } else if (this.currentPerson == "路人8" && this.thingIndex==4) {
                    if (this.say[16][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[16][1][newVal];
                } else if (this.currentPerson == "路人9" && this.thingIndex==4) {
                    if (this.say[17][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[17][1][newVal];
                } else if (this.currentPerson == "路人10" && this.thingIndex==4) {
                    if (this.say[18][1][newVal] == null) {
                        this.dialogVisible = false;
                    }
                    this.word = this.say[18][1][newVal];
                }
            }
        },
        outerVisible(newVal, oldVal) {
            if (newVal == false) {
                this.currentRoom = this.site;
            }
        },
        centerDialogVisible(newVal, oldVal) {
            if (newVal == false) {
                this.currentRoom = this.site;
            }
        },
        // word(newVal, oldVal) {
        //     if (newVal == "检票通过,请上车") {
        //         this.nextChapter();
        //     }
        // },
        currentRoom(newVal, oldVal) {
            if (newVal[0] == "车厢1" || newVal[0] == "车厢2" || newVal[0] == "车厢3" || newVal[0] == "厕所") {
                if (this.deadline.getHours() > 16) {
                    this.openThing("售票员");
                }
            }
        },
        deadline(newVal, oldVal) {
            if (this.site[0] == "列车") {
                if (newVal.getHours() == 18 && this.thingIndex == 0) {
                    this.content = "蓝色制服服务员:先生,正在进行二次检票,能出示一下证件吗";
                    this.centerDialogVisible = true;
                } else if (newVal.getHours() == 23 && this.thingIndex == 1) {
                    this.content = "红色制服服务员:先生,本车提供美味的卤煮,来一份吗";
                    this.centerDialogVisible = true;
                } else if ((newVal.getHours() == 4 || newVal.getHours() == 12) && this.thingIndex == 2) {
                    this.content = "路人1:好饿啊,你那里有没有吃的(是否将卤煮给路人1)";
                    this.centerDialogVisible = true;
                } else if ((newVal.getHours() == 8 || newVal.getHours() == 16) && this.thingIndex == 3) {
                    this.content = "路人1死亡,已被警方隔离调查";
                    this.centerDialogVisible = true;
                    this.thingIndex = 4;
                }
            }
        },
    },
    mounted() {
        this.random = Math.round(Math.random() * this.thing.length - 1);
        this.isNext();
        let gapTime = this.deadline.getHours();
        if (gapTime == 24) {
            gapTime = 0;
        }
        this.setTime = setInterval(() => {
            this.deadline = new Date(2024, 1, 1, gapTime, 0, 0)
            gapTime++;
            this.isNext();
        }, 1000 * 5);
    },
    beforeDestory() {
        clearInterval(this.setTime);
    },
    filters: {
        formatDate(item) {
            var hour = item.getHours();
            var minutes = item.getMinutes();
            return hour + ':' + minutes;
        }
    }
}
</script>
  
<style>
.body {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

.el-header {
    text-align: center;
}

.el-aside {
    text-align: center;
}

.el-main {
    text-align: center;
}

.el-row {
    margin-bottom: 1%;
}

.grid-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1%;
}

.grid-content .el-card {
    margin: 1%;
    line-height: 1000%;
}
</style>
  