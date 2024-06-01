<template>
    <div>
        <div class="body"></div>
        <el-dialog title="游戏规则" :visible.sync="dialogVisible" width="30%">
            <p>赛尔号玩过没?跟那个没关系</p>
        </el-dialog>

        <el-dialog title="选择元素" :visible.sync="mbtiDialogVisible" width="70%" center>
            <div class="dialog-content">
                <div v-for="(item, index) in element" :key="index">
                    <div @click="joinElement(item)">
                        <el-card class="box-card2">
                            <div slot="header" style="text-align: center;">
                                <span>{{ item[0] }}</span>
                            </div>
                            <el-image style="width: 50px; height: 80px;margin-left: 30px;"
                                :src="require('../../assets/' + item[0] + '.png')">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </el-card>
                    </div>
                </div>
            </div>
        </el-dialog>

        <el-header style="text-align: center;">
            <el-switch v-model="value1" active-text="护眼模式" inactive-text="默认模式" class="switch"></el-switch>
            <h1 style="color: white;">第二幕 第{{ chapter }}章 第{{ round }}回合</h1>
            <h2 style="color: white;">当前场景:竞技场</h2>
            <audio controls class="music">
                <source src="../../assets/Die For You.flac">
                您的浏览器不支持 audio 元素。
            </audio>
            <el-image :src="require('../../assets/' + img + '.png')" :style="style1" style="margin-top: 3%;z-index: 1;">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </el-header>
        <el-container>
            <el-aside>
                <el-popover placement="left" v-model="visible" trigger="hover">
                    <el-button slot="reference" class="thing">事件</el-button>
                </el-popover>
                <div v-for="(item, index) in mePower" :key="index">
                    <el-tooltip :content="item" placement="right-start" effect="light" class="tooltip">
                        <el-button>{{ item }}</el-button>
                    </el-tooltip>
                </div>
            </el-aside>
            <el-main>
                <section class="center-panel">
                    <div class="stage">
                        <el-card class="box-card1">
                            <el-progress :text-inside="true" :stroke-width="26"
                                :percentage="me[0].size / 10 > 100 || me[0].size / 10 < 0 ? 100 : me[0].size / 10"></el-progress>
                            <el-tag v-for="item in me" :key="item.label" :type="item.type" class="tags">
                                {{ item.label }}:{{ item.size }}
                            </el-tag>
                        </el-card>
                        <div>
                            <div>
                                <el-card class="mainstage">
                                    <div v-for="(item, index) in items" :key="index">
                                        <span v-if="item[1] == 99" style="color: lightcoral;">[boss]</span>
                                        <span v-else style="color: lightseagreen;">[我方]</span>
                                        {{ item[0] }}:{{ item[3] }}
                                    </div>
                                </el-card>
                            </div>

                        </div>
                        <el-card class="box-card1">
                            <el-progress :text-inside="true" :stroke-width="26"
                                :percentage="boss[0].size / 10 > 100 || boss[0].size / 10 < 0 ? 100 : boss[0].size / 10"
                                status="exception"></el-progress>
                            <el-tag v-for="item in boss" :key="item.label" :type="item.type" class="tags">
                                {{ item.label }}:{{ item.size }}
                            </el-tag>
                        </el-card>
                    </div>
                    <div style="display: flex;margin: 1%;">
                        <div>
                            <el-button @click="value2 = !value2">打开背包</el-button>
                            <el-button @click="mbtiDialogVisible = true">更换形态</el-button>
                        </div>
                        <div v-for="(item, index) in currentElement" :key="index" v-if="value2 == true">
                            <div @click="useMe(item, index)">
                                <el-card class="box-card1">
                                    <div style="color: lightseagreen;">
                                        {{ item[0] }}
                                    </div>
                                    <div>
                                        {{ item[1] }}
                                    </div>
                                    <span style="color: lightcoral;">
                                        {{ num[index] }}
                                    </span>/5
                                </el-card>
                            </div>
                        </div>
                        <div v-for="(item, index) in bag" :key="index" v-if="value2 == false">
                            <div @click="useMe(item, index)">
                                <el-card class="box-card1">
                                    <div>
                                        {{ item }}
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
    </div>
</template>

<script>
import { element1, xingzuo1 } from '@/utils/index.js'
export default {
    name: 'Vip',
    data() {
        return {
            visible: false,
            dialogVisible: false,
            mbtiDialogVisible: false,
            items: [],
            mePower: [],
            bag: ["恢复100hp", "恢复5pp"],
            bossPower: [xingzuo1[0]],
            element: element1,
            currentElement: [],
            xingzuo: xingzuo1,
            me: [
                { type: 'info', label: '血量', size: 1000 },
                { type: 'info', label: '攻击', size: 0 },
                { type: 'info', label: '护盾', size: 0 },
                { type: 'info', label: '状态', size: "无" },
                { type: 'info', label: '元素', size: "" },
            ],
            boss: [
                { type: 'info', label: '血量', size: 1000 },
                { type: 'info', label: '攻击', size: 0 },
                { type: 'info', label: '护盾', size: 0 },
                { type: 'info', label: '状态', size: "无" },
                { type: 'info', label: 'boss', size: xingzuo1[0][0] },
            ],
            round: 1,
            chapter: 1,
            style1: "display:none;",
            value1: false,
            value2: true,
            num: [],
            num1: [5, 5, 5, 5],
            num2: [5, 5, 5, 5],
            num3: [1, 5, 5, 5],
            num4: [5, 5, 5, 5],
            num5: [5, 5, 5, 5],
            img: "1",
            meIndex: [0, 0, 0, 0],
            bossIndex: [0, 0, 0, 0],
            meStatus: 0,
            bossStatus: 0,
        }
    },
    components: {

    },
    methods: {
        //使用卡牌
        useMe(item, index) {
            if (item == "恢复100hp") {
                this.value2 = true;
                this.me[0].size + 100 <= 1000 ? this.me[0].size += 100 : this.me[0].size = 1000;
                this.items.unshift(["使用道具", 98, 98, "恢复100hp"]);
                this.endTurn();
            } else if (item[0] == "你已被眩晕") {
                this.mbtiDialogVisible = true;
                this.endTurn();
            } else if (item == "恢复5pp") {
                this.value2 = true;
                this.items.unshift(["使用道具", 98, 98, "恢复5pp"]);
                this.endTurn();
                if (this.me[4].size == "火") {
                    this.num1 = [5, 5, 5, 5];
                    this.num = this.num1;
                } else if (this.me[4].size == "水") {
                    this.num2 = [5, 5, 5, 5];
                    this.num = this.num2;
                } else if (this.me[4].size == "木") {
                    this.num3 = [1, 5, 5, 5];
                    this.num = this.num3;
                } else if (this.me[4].size == "土") {
                    this.num4 = [5, 5, 5, 5];
                    this.num = this.num4;
                } else if (this.me[4].size == "电") {
                    this.num5 = [5, 5, 5, 5];
                    this.num = this.num5;
                }
            } else {
                if (this.me[4].size == "火" && this.num1[index] > 0) {
                    this.num1[index]--;
                    if (item[0] == "烈火飞龙") {
                        this.me[1].size = Math.floor((Math.random() * 100) + 150);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害"]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "火焰屏障") {
                        if (Math.random() < 30 / 100) {
                            this.boss[3].size = "眩晕";
                        }
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[1] = 3;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "火焰柱") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[2] = 1;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "火焰弹") {
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                        if (Math.random() < 50 / 100) {
                            this.boss[2].size = 0;
                        }
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害。" + item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    }
                } else if (this.me[4].size == "水" && this.num2[index] > 0) {
                    this.num2[index]--;
                    if (item[0] == "深海巨鲨") {
                        this.me[1].size = Math.floor((Math.random() * 75) + 75);
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[0] = 3;
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害"]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "水之守护") {
                        if (Math.random() < 30 / 100) {
                            this.boss[3].size = "眩晕";
                        }
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[1] = 3;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "浪涛汹涌") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[2] = 3;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "水之冲击") {
                        if (Math.random() < 50 / 100) {
                            this.bossPower = [];
                        }
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害。" + item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    }
                } else if (this.me[4].size == "木" && this.num3[index] > 0) {
                    this.num3[index]--;
                    if (item[0] == "唤星者") {
                        this.num1 = [5, 5, 5, 5]; this.num2 = [5, 5, 5, 5]; this.num3 = [0, 5, 5, 5]; this.num4 = [5, 5, 5, 5]; this.num5 = [5, 5, 5, 5]; this.num = this.num3;
                        this.me[0].size = 1000;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "森林庇护") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[1] = 4;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "万物生长") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[2] = 4;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "长者之树") {
                        if (Math.random() < 50 / 100) {
                            this.me[2].size = this.boss[2].size;
                            this.boss[2].size = 0;
                        }
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害。" + item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    }
                } else if (this.me[4].size == "土" && this.num4[index] > 0) {
                    this.num4[index]--;
                    if (item[0] == "多尾狐") {
                        this.me[1].size = Math.floor((Math.random() * 50) + 100);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害"]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "伫立之墙") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[1] = 3;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "硬化皮肤") {
                        this.me[1].size = this.me[2].size;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "大地之怒") {
                        this.boss[2].size = 0;
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害。" + item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    }
                } else if (this.me[4].size == "电" && this.num5[index] > 0) {
                    this.num5[index]--;
                    if (item[0] == "十万伏特") {
                        this.me[1].size = Math.floor((Math.random() * 75) + 125);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害"]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "雷电充能") {
                        this.mePower.indexOf(item[0]) == -1 ? this.mePower.push(item[0]) : "";
                        this.meIndex[1] = 2;
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "闪电之速") {
                        Math.random() < 30 / 100 ? this.me[2].size = 50 : "";
                        Math.random() < 70 / 100 ? this.boss[3].size = "眩晕" : "";
                        this.items.unshift(["使用" + item[0], 98, 98, item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    } else if (item[0] == "雷电千鸟") {
                        if (Math.random() < 50 / 100) {
                            this.boss[0].size < 200 ? this.boss[0].size = 0 : "";
                        }
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                        this.items.unshift(["使用" + item[0], 98, 98, "造成" + (this.me[1].size - this.boss[2].size) + "点伤害。" + item[1]]);
                        this.img = item[0];
                        this.endTurn();
                    }
                } else {
                    return this.$message.info('暂无使用次数');
                }
                this.$forceUpdate();
            }
        },
        //回合开始
        startTurn() {
            for (let i = 0; i < this.mePower.length; i++) {
                if (this.mePower[i] == "火焰屏障") {
                    if (this.meIndex[1] == 0) {
                        this.mePower.splice(this.mePower.indexOf("火焰屏障"), 1);
                    } else {
                        this.meIndex[1]--;
                        this.me[0].size += Math.floor((Math.random() * 100) + 100);
                        this.me[0].size >= 1000 ? this.me[0].size = 1000 : this.me[0].size;
                    }
                } else if (this.mePower[i] == "火焰柱") {
                    if (this.meIndex[2] == 0) {
                        this.mePower.splice(this.mePower.indexOf("火焰柱"), 1);
                    } else {
                        this.meIndex[2]--;
                        this.boss[1].size = 0;
                        this.me[1].size = Math.floor((Math.random() * 25) + 25);
                    }
                } else if (this.mePower[i] == "深海巨鲨") {
                    if (this.meIndex[0] == 0) {
                        this.mePower.splice(this.mePower.indexOf("深海巨鲨"), 1);
                    } else {
                        this.meIndex[0]--;
                        this.me[1].size = Math.floor((Math.random() * 25) + 50);
                    }
                } else if (this.mePower[i] == "水之守护") {
                    if (this.meIndex[1] == 0) {
                        this.mePower.splice(this.mePower.indexOf("水之守护"), 1);
                    } else {
                        this.meIndex[1]--;
                        this.me[0].size += Math.floor((Math.random() * 100) + 100);
                        this.me[0].size >= 1000 ? this.me[0].size = 1000 : this.me[0].size;
                    }
                } else if (this.mePower[i] == "浪涛汹涌") {
                    if (this.meIndex[2] == 0) {
                        this.mePower.splice(this.mePower.indexOf("浪涛汹涌"), 1);
                    } else {
                        this.meIndex[2]--;
                        this.me[3].size = "无";
                        this.me[2].size += 50;
                    }
                } else if (this.mePower[i] == "森林庇护") {
                    if (this.meIndex[1] == 0) {
                        this.mePower.splice(this.mePower.indexOf("森林庇护"), 1);
                    } else {
                        this.meIndex[1]--;
                        let num = Math.floor((Math.random() * 50) + 50);
                        this.me[0].size += num;
                        this.me[0].size >= 1000 ? this.me[0].size = 1000 : this.me[0].size;
                        this.boss[0].size -= num;
                    }
                } else if (this.mePower[i] == "万物生长") {
                    if (this.meIndex[2] == 0) {
                        this.mePower.splice(this.mePower.indexOf("万物生长"), 1);
                    } else {
                        this.meIndex[2]--;
                        this.me[3].size = "无";
                        this.me[2].size += 50;
                    }
                } else if (this.mePower[i] == "伫立之墙") {
                    if (this.meIndex[1] == 0) {
                        this.mePower.splice(this.mePower.indexOf("伫立之墙"), 1);
                    } else {
                        this.meIndex[1]--;
                        this.me[0].size += Math.floor((Math.random() * 100) + 100);
                        this.me[0].size >= 1000 ? this.me[0].size = 1000 : this.me[0].size;
                        this.me[2].size += 50;
                    }
                } else if (this.mePower[i] == "雷电充能") {
                    if (this.meIndex[1] == 0) {
                        this.mePower.splice(this.mePower.indexOf("雷电充能"), 1);
                    } else {
                        this.meIndex[1]--;
                        this.me[0].size += Math.floor((Math.random() * 100) + 100);
                        this.me[0].size >= 1000 ? this.me[0].size = 1000 : this.me[0].size;
                    }
                }
            }
        },
        //回合结束
        endTurn() {
            this.style1 = "display:inline-block";
            setTimeout(() => {
                this.style1 = "display:none";
            }, 2000);
            if (this.meStatus == 0 && this.me[3].size == "眩晕") {
                this.meStatus = 1;
                this.currentElement = [["你已被眩晕", "解除请切换形态"]]
            } else {
                this.meStatus = 0;
                this.me[3].size = "无";
            }
            if (this.bossStatus == 0 && this.boss[3].size == "眩晕") {
                this.bossStatus = 1;
                this.boss[1].size = 0;
            } else {
                this.bossStatus = 0;
                this.boss[3].size = "无"
            }
            this.bossAttack();
            this.mePower.indexOf("雷电充能") == -1 ? "" : this.me[1].size += 50 && this.items.unshift(["雷电充能", 98, 98, "触发致命一击!"]);
            this.mePower.indexOf("浪涛汹涌") == -1 ? "" : this.me[3].size = "无" && this.items.unshift(["浪涛汹涌", 98, 98, "触发解除控制!"]);
            this.me[2].size - this.boss[1].size < 0 ? this.me[0].size += this.me[2].size - this.boss[1].size : "";
            this.boss[2].size - this.me[1].size < 0 ? this.boss[0].size += this.boss[2].size - this.me[1].size : "";
            this.me[1].size = 0;
            this.boss[1].size = 0;
            this.me[2].size = 0;
            this.boss[2].size = 0;
            this.round++;
            this.active++;
        },
        bossAttack() {
            let num = Math.random();
            if (num <= 0.25) {
                this.boss[1].size = Math.floor((Math.random() * 100) + 200);
                this.items.unshift(["使用伤害", 99, 99, "造成" + (this.boss[1].size - this.me[2].size) + "点伤害"]);
            } else if (0.25 < num <= 0.5) {
                this.boss[2].size += 200;
                this.items.unshift(["使用护盾", 99, 99, "获得200点护盾"]);
            } else if (0.5 < num <= 0.75) {
                this.boss[0].size += 200;
                this.items.unshift(["使用回血", 99, 99, "恢复200血量"]);
                this.boss[0].size >= 1000 ? this.boss[0].size = 1000 : this.boss[0].size;
            } else if (0.75 < num <= 1) {
                this.boss[1].size = Math.floor((Math.random() * 50) + 50);
                if (Math.random() < 0.25) {
                    this.me[2].size = 0;
                    this.me[3].size = "眩晕";
                }
                this.items.unshift(["使用眩晕", 99, 99, "造成" + (this.boss[1].size - this.me[2].size) + "点伤害。50%清除对方能力上升状态并控制对方"]);
            }

        },
        //选择元素
        joinElement(item) {
            this.mbtiDialogVisible = false;
            this.value2 = true;
            this.currentElement = item[1];
            this.me[4].size = item[0];
            if (item[0] == "火") {
                this.num = this.num1;
            } else if (item[0] == "水") {
                this.num = this.num2;
            } else if (item[0] == "木") {
                this.num = this.num3;
            } else if (item[0] == "土") {
                this.num = this.num4;
            } else if (item[0] == "电") {
                this.num = this.num5;
            }
            this.mePower = [];
            this.endTurn();
        },
        isWin() {
            if (this.me[0].size <= 0) {
                this.$message.error('你输了');
            }
            if (this.boss[0].size <= 0) {
                this.$message.success('你赢了');
                this.round = 1;
                this.chapter++;
                this.me[0].size = 1000;
                this.boss[0].size = 1000;
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
    },
    computed: {

    },
    watch: {
        round(newVal, oldVal) {
            this.startTurn();
            this.isWin();
        },
        chapter(newVal, oldVal) {
            if (newVal == 2) {
                this.boss[4].size = this.xingzuo[1][0];
                this.bossPower = [this.xingzuo[1]];
            } else if (newVal == 3) {
                this.boss[4].size = this.xingzuo[2][0];
                this.bossPower = [this.xingzuo[2]];
            } else if (newVal == 4) {
                this.boss[4].size = this.xingzuo[3][0];
                this.bossPower = [this.xingzuo[3]];
            } else if (newVal == 5) {
                this.boss[4].size = this.xingzuo[3][0];
                this.bossPower = [this.xingzuo[3]];
            }
        },
        //护眼模式
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
    background-image: url('../../assets/竞技场.jpeg');
    z-index: -1;
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

::-webkit-scrollbar {
    display: none;
}

.tooltip {
    margin: 10%;
    width: 70%;
}

.center-panel {
    width: 65%;
    position: absolute;
}

.mainstage {
    width: 700px;
    height: 300px;
    overflow: auto;
}

.stage {
    display: flex;
    justify-content: space-between;
}

.box-card1 {
    padding: 20px;
    width: 220px;
    margin: 1px;
}

.box-card2 {
    width: 150px;
    height: 200px;
}

.tags {
    display: block;
    margin: 5%;
}

.dialog-content {
    display: flex;
    justify-content: space-evenly;
}
</style>