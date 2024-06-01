<template>
    <div>
        <div class="body body1"></div>
        <div class="body body2"></div>
        <div class="body body3"></div>
        <div class="body body4"></div>
        <div class="body body5"></div>
        <el-dialog title="游戏规则" :visible.sync="dialogVisible" width="30%">
            <p>(1)每有10金币下回合就会多得1金币,50封顶</p>
            <p>(2)每5回合出现强化</p>
            <p>(3)每7回合出现随机事件</p>
            <p>(4)生命值boss没有上限,玩家可以暂时超过上限</p>
            <p>(5)每回合多给当前回合数的金币</p>
            <p>(6)回合类效果大多在下回合开始生效</p>
            <p>(7)为什么有奇怪的规则?别问,问就代码好写</p>
        </el-dialog>

        <el-dialog title="选择你的人格" :visible.sync="mbtiDialogVisible" width="70%" center :before-close="handleClose">
            <div class="dialog-content">
                <div v-for="(item, index) in mbti" :key="index">
                    <div @click="joinMbti(item)">
                        <el-card class="box-card2">
                            <div slot="header" style="text-align: center;">
                                <span>{{ item[0] }}</span>
                            </div>
                            <div style="text-align: center;">{{ item[1] }}</div>
                            <el-image style="width: 50px; height: 80px;margin-left: 30px;"
                                :src="require('../../assets/' + item[0] + '.jpeg')">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </el-card>
                    </div>
                </div>
            </div>
            <el-button style="position: relative;left: 45%;margin-top: 20px;">刷新x{{ refresh }}</el-button>
        </el-dialog>

        <el-dialog title="选择你的强化" :visible.sync="centerDialogVisible" width="70%" center :before-close="handleClose">
            <div class="dialog-content">
                <div v-for="(item, index) in power" :key="index">
                    <div @click="joinPower(item)">
                        <el-card>
                            <div slot="header" style="text-align: center;">
                                <span>{{ item[0] }}</span>
                            </div>
                            <div style="text-align: center;">{{ item[1] }}</div>
                            <el-image style="width: 300px; height: 500px;"
                                :src="require('../../assets/' + item[0] + '.jpeg')">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </el-card>
                    </div>
                </div>
            </div>
            <el-button style="position: relative;left: 45%;margin-top: 20px;" @click="refreshPower()"
                :disabled="this.refresh == 0">刷新x{{ refresh }}</el-button>
        </el-dialog>

        <el-dialog title="随机事件" :visible.sync="thingDialogVisible" width="70%" center>
            <div style="text-align: center;">
                <h1>{{ thing[thing.length - 1][0] }}</h1>
                <h2>{{ thing[thing.length - 1][1] }}</h2>
                <el-image style="width: 300px; height: 500px"
                    :src="require('../../assets/' + thing[thing.length - 1][0] + '.jpeg')">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
        </el-dialog>

        <el-container>
            <el-header class="header">
                <el-switch v-model="value1" active-text="护眼模式" inactive-text="默认模式" class="switch"></el-switch>
                <h1 style="color: white;">第一幕 第{{ chapter }}章 第{{ round }}回合</h1>
                <h2 style="color: white;">当前场景:{{ area }}</h2>
                <audio controls class="music">
                    <source src="../../assets/Die For You.flac">
                    您的浏览器不支持 audio 元素。
                </audio>
                <el-image :src="require('../../assets/3.gif')" :style="style1" style="margin-top: 3%;z-index: 1;">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </el-header>
            <el-container>
                <el-aside>
                    <el-popover placement="left" v-model="visible" trigger="hover">
                        <h3>随机事件</h3>
                        <div v-for="(item, index) in thing" :key="index">
                            <p>{{ index + 1 }}.{{ item[0] }}:{{ item[1] }}</p>
                            <el-image style="width: 100px; height: 150px"
                                :src="require('../../assets/' + item[0] + '.jpeg')">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                        <el-button slot="reference" class="thing">事件</el-button>
                    </el-popover>
                    <div v-for="(item, index) in mePower" :key="index">
                        <el-tooltip :content="item[1]" placement="right-start" effect="light" class="tooltip">
                            <el-button>{{ item[0] }}
                                <el-image style="width: 50px; height: 70px;display: block;margin: auto;"
                                    :src="require('../../assets/' + item[0] + '.jpeg')">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                </el-image>
                            </el-button>
                        </el-tooltip>
                    </div>
                </el-aside>
                <el-main>
                    <section class="center-panel">
                        <div class="stage" v-loading="loading">
                            <el-card class="box-card1">
                                <el-progress :text-inside="true" :stroke-width="26"
                                    :percentage="me[0].size > 100 || me[0].size < 0 ? 100 : me[0].size"></el-progress>
                                <el-tag v-for="item in me" :key="item.label" :type="item.type" class="tags">
                                    {{ item.label }}:{{ item.size }}
                                </el-tag>
                            </el-card>
                            <div>
                                <div>
                                    <el-card style="width: 700px;height: 130px;overflow: auto;">
                                        <div v-for="(item, index) in items1" :key="index">
                                            <span v-if="item[1] == 99" style="color: lightcoral;">[boss]</span>
                                            <span v-else style="color: lightseagreen;">[我方]</span>
                                            {{ item[0] }}:{{ item[3] }}
                                        </div>
                                    </el-card>
                                </div>
                                <draggable v-model="items1" group="people" animation="0" @start="onStart" @end="onEnd">
                                    <transition-group class="buttons" :style="style">
                                    </transition-group>
                                </draggable>
                            </div>
                            <el-card class="box-card1">
                                <el-progress :text-inside="true" :stroke-width="26"
                                    :percentage="boss[0].size > 100 || boss[0].size < 0 ? 100 : boss[0].size"
                                    status="exception"></el-progress>
                                <el-tag v-for="item in boss" :key="item.label" :type="item.type" class="tags">
                                    {{ item.label }}:{{ item.size }}
                                </el-tag>
                            </el-card>
                        </div>
                        <div class="buttons">
                            <div class="left_buttons">
                                <el-button class="el_button">能量:{{ energy }}</el-button>
                                <el-button class="el_button" @click="endTurn()">结束回合</el-button>
                            </div>
                            <draggable v-model="items" group="people" animation="0" @start="onStart" @end="onEnd($event)"
                                :sort="false">
                                <transition-group class="buttons" :style="style">
                                    <div v-for="(item, index) in items" :key="index">
                                        <el-popover placement="top">
                                            <div>
                                                威力：{{ item[1] }}
                                            </div>
                                            <div>
                                                耗能：{{ item[2] }}
                                            </div>
                                            <div>
                                                {{ item[3] }}
                                            </div>
                                            <el-card class="box-card" slot="reference">
                                                <div>
                                                    {{ item[0] }}
                                                </div>
                                            </el-card>
                                        </el-popover>
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                        <div class="buttons">
                            <div class="left_buttons">
                                <el-button class="el_button">金币：{{ money }}</el-button>
                                <el-button class="el_button" @click="getRandom()">重置(2金币)</el-button>
                            </div>
                            <div class="buttons" v-for="(item, index) in shop" :key="index">
                                <div @click="goumai(item, index)">
                                    <el-card class="box-card1">
                                        <div>
                                            {{ item[0] }}
                                        </div>
                                        <div>
                                            威力：{{ item[1] }}
                                        </div>
                                        <div>
                                            消耗：{{ item[2] }}
                                        </div>
                                        <div>
                                            价格：{{ item[2] * 2 }}
                                        </div>
                                        <div>
                                            描述：{{ item[3] }}
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </section>
                </el-main>
                <el-aside>
                    <el-button class="rule" @click="dialogVisible = true">规则</el-button>
                    <div v-for="(item, index) in bossPower" :key="index">
                        <el-tooltip :content="item[1]" placement="right-start" effect="light" class="tooltip">
                            <el-button>{{ item[0] }}
                                <el-image style="width: 50px; height: 70px;display: block;margin: auto;"
                                    :src="require('../../assets/' + item[0] + '.jpeg')">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                </el-image>
                            </el-button>
                        </el-tooltip>
                    </div>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { shop1, power1, thing1, mbti1, xingzuo1 } from '@/utils/index.js';
import draggable from 'vuedraggable'
export default {
    name: 'Vip',
    data() {
        return {
            visible: false,
            dialogVisible: false,
            centerDialogVisible: false,
            thingDialogVisible: false,
            mbtiDialogVisible: false,
            loading: false,
            items: [["普通攻击", 10, 1, "攻击+10"], ["普通防御", 0, 1, "防御+10"], ["治疗回血", 0, 1, "回血+10"]],
            items1: [],
            items2: 0,
            shop: [],
            power: [],
            thing: [],
            mePower: [],
            bossPower: [xingzuo1[0]],
            mbti: mbti1,
            xingzuo: xingzuo1,
            me: [
                { type: 'info', label: '血量', size: 100 },
                { type: 'info', label: '攻击', size: 10 },
                { type: 'info', label: '护盾', size: 0 },
                { type: 'info', label: '人格', size: "" },
            ],
            boss: [
                { type: 'info', label: '血量', size: 100 },
                { type: 'info', label: '攻击', size: 20 },
                { type: 'info', label: '护盾', size: 10 },
                { type: 'info', label: 'boss', size: xingzuo1[0][0] },
            ],
            energy: 5,
            round: 1,
            chapter: 1,
            money: 32,
            refresh: 1,
            round1: 0,
            round2: 0,
            area: "列车站",
            drag: false,
            style: "min-height:120px;",
            style1: "display:none;",
            value1: false,
            isDied: false,
        }
    },
    components: {
        draggable,
    },
    methods: {
        //开始拖拽事件
        onStart() {
            this.drag = true;
            this.items2 = this.items1.length;
        },
        //拖拽结束事件
        onEnd(e) {
            this.drag = false;
            if (this.items1.length > this.items2) {
                this.useMe(e.item._underlying_vm_, 99);
                this.items1.shift();
            }
        },
        //使用卡牌
        useMe(item, index) {
            if (item[2] > this.energy) {
                this.items.unshift(this.items1[0])
                return this.$message.error('能量不足');
            }
            if (item[0] == "治疗回血") {
                this.me[0].size += 10;
                this.quchu(item, index);
            } else if (item[0] == "普通攻击") {
                this.me[1].size += item[1];
                this.quchu(item, index);
            } else if (item[0] == "普通防御") {
                this.me[2].size += 10;
                this.quchu(item, index);
            } else if (item[0] == "双重打击") {
                this.me[1].size += item[1];
                this.quchu(item, index);
            } else if (item[0] == "致命一击") {
                this.me[1].size *= 2;
                this.quchu(item, index);
            } else if (item[0] == "超级防御") {
                this.me[2].size *= 2;
                this.quchu(item, index);
            } else if (item[0] == "完美防御") {
                this.boss[1].size = 0;
                this.quchu(item, index);
            } else if (item[0] == "护盾打击") {
                this.me[1].size += this.me[2].size;
                this.quchu(item, index);
            } else if (item[0] == "危险进攻") {
                this.me[1].size += item[1];
                this.me[0].size -= 5;
                this.quchu(item, index);
            } else if (item[0] == "免费重置") {
                this.getRandom();
                this.money += 2;
                this.quchu(item, index);
            } else if (item[0] == "补充能量") {
                this.energy += 1;
                this.quchu(item, index);
            }
        },
        //去除使用过的卡牌
        quchu(item, index) {
            for (let i = 0; i < this.items.length; i++) {
                if (i == index) {
                    this.items.splice(i, 1);
                }
            }
            this.energy -= item[2];
            this.items1.unshift(item);
        },
        //从商店购买卡牌
        goumai(item, index) {
            if (this.items.length == 9) return this.$message.error('背包已满');
            if (this.money >= item[2] * 2) {
                this.money -= item[2] * 2;
                this.items.push(item);
                for (let i = 0; i < this.shop.length; i++) {
                    if (i == index) {
                        this.shop.splice(i, 1);
                    }
                }
            } else {
                this.$message.error('金币不足');
            }
        },
        //回合开始
        startTurn() {
            for (let i = 0; i < this.thing.length; i++) {
                if (this.thing[i][0] == "力量") {
                    this.me[1].size += 20;
                } else if (this.thing[i][0] == "月亮") {
                    this.energy += 1;
                } else if (this.thing[i][0] == "节制") {
                    this.energy -= 1;
                } else if (this.thing[i][0] == "女皇") {
                    this.money += 5;
                }
            };
            if (this.boss[3].size == "双鱼座") {
                this.energy -= 1;
            } else if (this.boss[3].size == "金牛座") {
                this.money -= 3;
            } else if (this.boss[3].size == "处女座") {
                this.me[2].size -= 10;
            } else if (this.boss[3].size == "天蝎座") {
                this.boss[1].size += 10;
            }
        },
        //回合结束
        endTurn() {
            // this.loading = true;
            this.style1 = "display:inline-block";
            setTimeout(() => {
                // this.loading = false;
                this.style1 = "display:none";
            }, 1000);
            for (let i = 0; i < this.mePower.length; i++) {
                if (this.mePower[i][0] == "宝剑国王") {
                    var arr = this.items.some(function (x) {
                        return x[1] !== 0;
                    });
                    if (arr == false) this.me[1].size *= 2;
                } else if (this.mePower[i][0] == "宝剑皇后") {
                    var arr2 = this.items.filter(function (x) {
                        return x[1] !== 0;
                    });
                    arr2.forEach(function (x) {
                        x[1] * 2 <= 40 ? x[1] *= 2 : x[1] = 40;
                    });
                }
            }
            this.items1.unshift(["发动攻击", 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害"])
            this.items1.unshift(["发动攻击", 99, 99, "造成" + (this.boss[1].size - this.me[2].size) + "点伤害"])
            this.boss[0].size += this.boss[2].size - this.me[1].size;
            this.me[0].size += this.me[2].size - this.boss[1].size;
            this.me[0].size > 100 ? this.me[0].size = 100 : this.me[0].size;
            this.me[1].size = 10;
            this.me[2].size = 0;
            this.boss[1].size = 20;
            this.boss[2].size = 10;
            this.round++;
            this.energy = 5;
            //每有10金币下回合就会多得1金币，50封顶
            if (this.money <= 50) {
                this.money += Math.floor(this.money / 10);
            } else {
                this.money += 5;
            }
            this.money += this.round;
            this.active++;
        },
        //商店取牌(耗钱刷新商店)
        getRandom() {
            if (this.money < 2) return this.$message.error('金币不足');
            this.money -= 2;
            this.shop = [];
            //随机取5个不重复数组
            for (let i = 0; i < 4; i++) {
                let num = Math.floor(Math.random() * shop1.length);
                if (this.shop.indexOf(shop1[num]) == -1) {
                    this.shop.push(shop1[num]);
                } else {
                    i--;
                }
            }
        },
        //商店取牌(不耗钱刷新商店)
        getRandomNO() {
            this.shop = [];
            //随机取5个不重复数组
            for (let i = 0; i < 4; i++) {
                let num = Math.floor(Math.random() * shop1.length);
                if (this.shop.indexOf(shop1[num]) == -1) {
                    this.shop.push(shop1[num]);
                } else {
                    i--;
                }
            }
        },
        //强化取牌
        getRandomPower() {
            this.power = [];
            for (let i = 0; i < 3; i++) {
                let num = Math.floor(Math.random() * power1.length);
                if (this.power.indexOf(power1[num]) == -1 && this.mePower.indexOf(power1[num]) == -1) {
                    this.power.push(power1[num]);
                } else {
                    i--;
                }
            }
        },
        //事件取牌
        getRandomThing() {
            let num = Math.floor(Math.random() * thing1.length);
            if (this.thing.indexOf(thing1[num]) == -1) {
                this.thing.push(thing1[num]);
            } else {
                this.getRandomThing();
            }
            if (thing1[num][0] == "愚人") {
                this.me[0].size = 100; this.boss[0].size += 100;
            } else if (thing1[num][0] == "倒吊人") {
                this.me[0].size -= 30; this.boss[0].size -= 30;
                this.isWin();
            } else if (thing1[num][0] == "世界") {
                this.me[0].size = Math.round(Math.random() * 99);
                this.boss[0].size = Math.round(Math.random() * 99);
                this.me[1].size = Math.round(Math.random() * 99);
                this.boss[1].size = Math.round(Math.random() * 99);
                this.me[2].size = Math.round(Math.random() * 99);
                this.boss[2].size = Math.round(Math.random() * 99);
            } else if (thing1[num][0] == "命运之轮") {
                this.items = [["攻", 10, 1, "攻击"], ["防", 10, 1, "防御"], ["血", 10, 1, "回血"]],
                    this.shop = [],
                    this.power = [],
                    this.thing = [],
                    this.mePower = [],
                    this.bossPower = [],
                    this.me = [
                        { type: 'info', label: '血量', size: 100 },
                        { type: 'info', label: '攻击', size: 10 },
                        { type: 'info', label: '护盾', size: 0 },
                    ],
                    this.boss = [
                        { type: 'info', label: '血量', size: 100 },
                        { type: 'info', label: '攻击', size: 20 },
                        { type: 'info', label: '护盾', size: 0 },
                    ],
                    this.energy = 3,
                    this.round = 1,
                    this.chapter = 1,
                    this.money = 32,
                    this.refresh = 1
            } else if (thing1[num][0] == "女祭司") {
                this.me[0].size = Math.round(Math.random() * 99);
                this.me[1].size = Math.round(Math.random() * 99);
                this.me[2].size = Math.round(Math.random() * 99);
            } else if (thing1[num][0] == "战车") {
                this.me[1].size += 30;
            } else if (thing1[num][0] == "隐士") {
                this.me[2].size += 30;
            } else if (thing1[num][0] == "太阳") {
                this.me[0].size += 50;
            } else if (thing1[num][0] == "教皇") {
                this.energy += 3;
            } else if (thing1[num][0] == "皇帝") {
                this.money += 30;
            } else if (thing1[num][0] == "恋人") {
                this.me[0].size *= 2;
                this.me[1].size *= 2;
                this.me[2].size *= 2;
            } else if (thing1[num][0] == "审判") {
                this.me[1].size *= 3;
            } else if (thing1[num][0] == "灯塔") {
                this.boss[1].size = 0;
            } else if (thing1[num][0] == "魔鬼") {
                this.boss[0].size *= 2;
                this.boss[1].size *= 2;
                this.boss[2].size *= 2;
            } else if (thing1[num][0] == "魔术师") {
                this.boss[0].size = Math.round(Math.random() * 99);
                this.boss[1].size = Math.round(Math.random() * 99);
                this.boss[2].size = Math.round(Math.random() * 99);
            } else if (thing1[num][0] == "死神") {
                if (this.me[0].size >= this.boss[0].size) {
                    this.$message.success('你赢了');
                    this.round = 1;
                    this.me[0].size = 100;
                    this.chapter++;
                    this.boss[0].size += this.chapter * 100;
                } else {
                    this.$message.error('你输了');
                }
            } else if (thing1[num][0] == "星星") {
                this.refresh++;
            }
        },
        //刷新强化
        refreshPower() {
            this.getRandomPower();
            this.refresh -= 1;
        },
        handleClose() {
            return this.$message.info('请选择强化');
        },
        //加入立即类强化
        joinPower(power) {
            this.mePower.push(power);
            this.centerDialogVisible = false;
            if (power[0] == "圣杯国王") {
                this.me[0].size += 50;
            } else if (power[0] == "星币国王") {
                if (this.money <= 20) this.money += 30;
            } else if (power[0] == "星币皇后") {
                this.money += 20;
            }
        },
        //加入人格强化
        joinMbti(item) {
            this.mbtiDialogVisible = false;
            this.me[3].size = item[0];
            this.mePower.push(item);
            if (this.me[3].size == "ISFP") {
                this.money += 20;
            } else if (this.me[3].size == "INFP") {
                this.refresh++;
            }
        },
        //加入回合类强化
        isPower() {
            for (let i = 0; i < this.mePower.length; i++) {
                if (this.mePower[i][0] == "圣杯皇后") {
                    this.me[0].size += 5;
                } else if (this.mePower[i][0] == "圣杯骑士" && this.isDied == false) {
                    if (this.me[0].size <= 0) this.me[0].size = 30;
                    this.isDied = true;
                } else if (this.mePower[i][0] == "圣杯侍从" && this.isDied == false) {
                    if (this.me[0].size <= 0) this.me[0].size = 1;
                    this.isDied = true;
                } else if (this.mePower[i][0] == "星币骑士") {
                    this.money += 5;
                } else if (this.mePower[i][0] == "星币侍从") {
                    this.round1++;
                    if (this.round1 == 3) this.money += 30;
                } else if (this.mePower[i][0] == "宝剑骑士") {
                    this.me[1].size += 10;
                } else if (this.mePower[i][0] == "权杖国王") {
                    this.energy += 2;
                } else if (this.mePower[i][0] == "权杖骑士") {
                    this.me[2].size += 10;
                } else if (this.mePower[i][0] == "权杖皇后") {
                    this.money += 2;
                } else if (this.mePower[i][0] == "权杖侍从") {
                    this.round2++;
                    if (this.round2 == 5)
                        this.money += 5;
                    this.me[1].size += 20;
                    this.me[2].size += 10;
                }
            }
            if (this.me[3].size == "ISTJ") {
                this.energy++;
            } else if (this.me[3].size == "ISFJ") {
                this.me[1].size += 10;
            } else if (this.me[3].size == "INFJ") {
                this.me[2].size += 10;
            } else if (this.me[3].size == "INTJ") {
                this.me[0].size += 3;
            } else if (this.me[3].size == "ISTP") {
                this.money += 3;
            } else if (this.me[3].size == "INTP") {
                this.me[0].size += 5;
                this.me[1].size += 5;
                this.me[2].size += 5;
            }
        },
        isWin() {
            if (this.me[0].size <= 0) {
                this.$message.error('你输了');
            }
            if (this.boss[0].size <= 0) {
                this.$message.success('你赢了');
                this.round = 1;
                this.me[0].size = 100;
                this.chapter++;
                this.boss[0].size += this.chapter * 100;
            }
        },
        bodyScale() {
            let devicewidth = document.documentElement.clientWidth//获取当前分辨率下的可是区域宽度
            let scale = devicewidth / 1920 // 分母——设计稿的尺寸
            document.body.style.zoom = scale//放大缩小相应倍数
        }
    },
    mounted() {
        window.onresize = () => {
            return (() => {
                // 页面变化监听尺寸
                this.bodyScale()
            })()
        }
    },
    created() {
        this.mbtiDialogVisible = true;
        this.getRandom();
        this.thingDialogVisible = true;
        this.getRandomThing();
    },
    computed: {

    },
    watch: {
        round(newVal, oldVal) {
            this.startTurn();
            this.isPower();
            this.getRandomNO();
            this.isWin();
            if (newVal % 5 == 0) {
                this.centerDialogVisible = true;
                this.getRandomPower();
            }
            if (newVal % 7 == 0) {
                this.thingDialogVisible = true;
                this.getRandomThing();
            }
        },
        chapter(newVal, oldVal) {
            if (newVal == 2) {
                document.getElementsByClassName('body1')[0].style.display = 'none';
                this.area = "学校";
                this.boss[3].size = this.xingzuo[1][0];
                this.bossPower = [this.xingzuo[1]];
            } else if (newVal == 3) {
                document.getElementsByClassName('body2')[0].style.display = 'none';
                this.area = "宿舍";
                this.boss[3].size = this.xingzuo[2][0];
                this.bossPower = [this.xingzuo[2]];
            } else if (newVal == 4) {
                document.getElementsByClassName('body3')[0].style.display = 'none';
                this.area = "医院";
                this.boss[3].size = this.xingzuo[3][0];
                this.bossPower = [this.xingzuo[3]];
            } else if (newVal == 5) {
                document.getElementsByClassName('body4')[0].style.display = 'none';
                this.area = "教堂";
                this.boss[3].size = this.xingzuo[3][0];
                this.bossPower = [this.xingzuo[3]];
            }
        },
        value1(newVal, oldVal) {
            let arr = document.getElementsByClassName('el-card');
            let arr1 = document.getElementsByClassName('el-button');
            if (newVal == true) {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.backgroundColor = 'lightgray';
                }
                for (let i = 0; i < arr1.length; i++) {
                    arr1[i].style.backgroundColor = 'lightgray';
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].style.backgroundColor = '';
                }
                for (let i = 0; i < arr1.length; i++) {
                    arr1[i].style.backgroundColor = '';
                }
            }
        }
    },
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
}

.body1 {
    background-image: url('../../assets/火车站.jpeg');
    z-index: -1;
}

.body2 {
    background-image: url('../../assets/学校.jpeg');
    z-index: -2;
}

.body3 {
    background-image: url('../../assets/宿舍.jpeg');
    z-index: -3;
}

.body4 {
    background-image: url('../../assets/医院.jpeg');
    z-index: -4;
}

.body5 {
    background-image: url('../../assets/教堂.jpeg');
    z-index: -5;
}

.thing {
    width: 70%;
    margin-left: 10%;
}

.rule {
    width: 70%;
    margin-left: 10%;
}

.music {
    position: absolute;
    top: 1%;
    right: 1%;
    height: 3%;
}

.switch {
    position: absolute;
    top: 1%;
    left: 3%;
}

.header {
    text-align: center;
}

::-webkit-scrollbar {
    display: none;
}

.tooltip {
    display: block;
    margin: 10%;
    width: 70%;
}

.center-panel {
    position: absolute;
    width: 65%;
}

.buttons {
    display: flex;
}

.left_buttons {
    height: 100%;
    width: 10%;
}

.el_button {
    margin: 7%;
    width: 80%;
}

.stage {
    display: flex;
    justify-content: space-between;
}

.box-card {
    margin: 5px;
    padding: 12%;
}

.box-card1 {
    margin: 1px;
    padding: 20px;
    width: 220px;
    height: 90%;
}

.box-card2 {
    width: 150px;
    height: 200px;
}

.tags {
    display: block;
    margin: 5%;
    height: 20%;
}

.dialog-content {
    display: flex;
    justify-content: space-evenly;
}
</style>