<template>
    <div>
        <el-container>
            <el-header class="header">
                <div class="headerText">金币:{{ money }}</div>
                <div class="headerText">
                    <el-button icon="el-icon-chat-line-square" @click="meAnserDialogVisible = true"></el-button>
                    <el-button icon="el-icon-user" @click="meCardDialogVisible = true"></el-button>
                    战斗 {{ bossIndex + 1 }}/30
                    <el-button icon="el-icon-user-solid" @click="bossCardDialogVisible = true"></el-button>
                    <el-button icon="el-icon-user-solid" @click="bossCardDialogVisible = true"></el-button>
                </div>
                <div class="headerText">00:{{ time < 10 ? '0' + time : time }}</div>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="6">
                        <div class="mePower">
                            <el-tooltip :content="item.info" placement="bottom" effect="light"
                                v-for="(item, index) in meArtifact" :key="index">
                                <el-badge :value="item.num" class="item" type="primary">
                                    <el-tag>{{ item.name }}</el-tag>
                                </el-badge>
                            </el-tooltip>
                        </div>
                        <div class="meAttack">
                            <div>弹夹x{{ meAttack.length }}</div>
                            <el-button class="meAttackBox" v-for="(item, index) in meAttack" :key="index" :icon="item == 1 ? 'el-icon-basketball' : item == 2 ? 'el-icon-chicken' : item == 3 ?
                                'el-icon-soccer' : item == 4 ? 'el-icon-knife-fork' : 'el-icon-eleme'"
                                circle></el-button>
                        </div>
                        <div class="meItem">
                            <div>属性</div>
                            <div class="meItemText">
                                <p>最大生命值</p>
                                <p>{{ meMax.blood }}</p>
                            </div>
                            <div class="meItemText">
                                <p>力量</p>
                                <p>{{ meActive.power }}</p>
                            </div>
                            <div class="meItemText">
                                <p>能量恢复</p>
                                <p>{{ meActive.energyRecover }}</p>
                            </div>
                            <div class="meItemText">
                                <p>大招伤害</p>
                                <p>{{ meActive.big }}</p>
                            </div>
                            <div class="meItemText">
                                <p>攻击速度</p>
                                <p>{{ meActive.speed }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>护甲</p>
                                <p>{{ meActive.defense }}</p>
                            </div>
                            <div class="meItemText">
                                <p>反伤</p>
                                <p>{{ meActive.reverse }}</p>
                            </div>
                            <div class="meItemText">
                                <p>暴击率</p>
                                <p>{{ meActive.critical }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>暴击伤害</p>
                                <p>{{ meActive.criticalDamage }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>闪避率</p>
                                <p>{{ meActive.dodge }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>重伤</p>
                                <p>{{ meActive.seriousInjury }}</p>
                            </div>
                            <div class="meItemText">
                                <p>回血</p>
                                <p>{{ Math.floor(meActive.recover) }}</p>
                            </div>
                            <div class="meItemText">
                                <p>收入</p>
                                <p>{{ meActive.money }}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="mainBox">
                            <div>
                                <div class="character">
                                    <div class="progress">
                                        <el-progress :text-inside="true" :stroke-width="24" class="progress-bar"
                                            :percentage="(bossActive.blood > bosss[bossIndex].blood ? 100 : bossActive.blood / bosss[bossIndex].blood * 100)"
                                            :format="formatBossBlood" status="success"></el-progress>
                                        <el-progress :text-inside="true" :stroke-width="22"
                                            :percentage="bossActive.energy > 0 ? bossActive.energy / 10 : 0"
                                            :format="formatBossPower" status="warning" class="progress-bar"></el-progress>
                                    </div>
                                    <img :src="bosss[bossIndex].img" class="boss" />
                                    <div v-for=" damage  in  bossDamages " :key="damage.id" class="damage-popup"
                                        :class="damage.type" :style="damage.style">
                                        {{ damage.type == 'heal' ? '+' + damage.value : '-' + damage.value }}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="attack">
                                    <i class="el-icon-basketball" v-for="(stone, index) in bossStones" :key="index"
                                        :class="{ stone: true, 'stone-fade': stone.fade }"
                                        :style="{ top: stone.top + 'px', left: stone.left + 'px' }"></i>
                                </div>
                                <div class="attack">
                                    <i class="el-icon-basketball" v-for="(stone, index) in meStones" :key="index"
                                        :class="{ stone1: true, 'stone-fade': stone.fade }"
                                        :style="{ top: stone.top + 'px', left: stone.left + 'px' }"></i>
                                </div>
                            </div>
                            <div>
                                <div class="character">
                                    <img src="@/assets/logo.png" class="boss" />
                                    <div v-for=" damage  in  meDamages " :key="damage.id" class="damage-popup"
                                        :class="damage.type" :style="damage.style">
                                        {{ damage.type == 'heal' ? '+' + damage.value : '-' + damage.value }}
                                    </div>
                                    <div class="progress">
                                        <el-progress :text-inside="true" :stroke-width="24" class="progress-bar"
                                            :percentage="(meActive.blood > meMax.blood ? 100 : meActive.blood / meMax.blood * 100)"
                                            :format="formatMeBlood" status="success"></el-progress>
                                        <el-progress :text-inside="true" :stroke-width="22"
                                            :percentage="meActive.energy > 0 ? meActive.energy / 10 : 0"
                                            :format="formatMePower" status="warning" class="progress-bar"></el-progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="mePower bossAttack">
                            <el-tooltip :content="item.info" placement="bottom" effect="light"
                                v-for="( item, index ) in  bossArtifact " :key="index">
                                <el-badge :value="item.num" class="item" type="primary">
                                    <el-tag>{{ item.name }}</el-tag>
                                </el-badge>
                            </el-tooltip>
                        </div>
                        <div class="meAttack bossAttack">
                            <div>弹夹x{{ bosss[bossIndex].attack.length }}</div>
                            <el-button class="meAttackBox" v-for="( item, index ) in  bosss[bossIndex].attack " :key="index"
                                :icon="item == 1 ? 'el-icon-basketball' : item == 2 ? 'el-icon-chicken' : item == 3 ?
                                    'el-icon-soccer' : item == 4 ? 'el-icon-knife-fork' : 'el-icon-eleme'
                                    " circle></el-button>
                        </div>
                        <div class="meItem bossAttack">
                            <div>属性</div>
                            <div class="meItemText">
                                <p>最大生命值</p>
                                <p>{{ bosss[bossIndex].blood }}</p>
                            </div>
                            <div class="meItemText">
                                <p>力量</p>
                                <p>{{ bossActive.power }}</p>
                            </div>
                            <div class="meItemText">
                                <p>能量恢复</p>
                                <p>{{ bossActive.energyRecover }}</p>
                            </div>
                            <div class="meItemText">
                                <p>大招伤害</p>
                                <p>{{ bossActive.big }}</p>
                            </div>
                            <div class="meItemText">
                                <p>攻击速度</p>
                                <p>{{ bossActive.speed }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>护甲</p>
                                <p>{{ bossActive.defense }}</p>
                            </div>
                            <div class="meItemText">
                                <p>反伤</p>
                                <p>{{ bossActive.reverse }}</p>
                            </div>
                            <div class="meItemText">
                                <p>暴击率</p>
                                <p>{{ bossActive.critical }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>暴击伤害</p>
                                <p>{{ bossActive.criticalDamage }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>闪避率</p>
                                <p>{{ bossActive.dodge }}%</p>
                            </div>
                            <div class="meItemText">
                                <p>重伤</p>
                                <p>{{ bossActive.seriousInjury }}</p>
                            </div>
                            <div class="meItemText">
                                <p>回血</p>
                                <p>{{ bossActive.recover }}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <el-dialog title="选择一个能力" :visible.sync="cardDialogVisible" width="50%" center :before-close="handleClose">
            <div class="dialog-content">
                <div v-for="( item, index ) in  card3 " :key="index">
                    <div @click="joinCard(item)">
                        <el-card :style="{ backgroundColor: item.color }" class="card-item">
                            <div slot="header" style="text-align: center;">
                                <span>{{ item.name }}</span>
                            </div>
                            <div style="text-align: center;">{{ item.info }}</div>
                        </el-card>
                    </div>
                </div>
            </div>
            <div style="text-align: center;margin-top: 10%;">
                <el-button @click="drawCard(10)">刷新(10金币)</el-button>
                <el-button icon="el-icon-user" @click="meCardDialogVisible = true"></el-button>
            </div>
        </el-dialog>
        <el-dialog title="我的卡牌" :visible.sync="meCardDialogVisible" width="80%" center>
            <div class="dialog-content">
                <div v-for="( item, index ) in  meCard " :key="index">
                    <el-card :style="{ backgroundColor: item.color }" class="card-item">
                        <div slot="header" style="text-align: center;">
                            <span>{{ item.name }}X{{ item.num }}</span>
                        </div>
                        <div style="text-align: center;">{{ item.info }}</div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="对手的卡牌" :visible.sync="bossCardDialogVisible" width="80%" center>
            <div class="dialog-content">
                <div v-for="( item, index ) in  bossCard " :key="index">
                    <el-card :style="{ backgroundColor: item.color }" class="card-item">
                        <div slot="header" style="text-align: center;">
                            <span>{{ item.name }}X{{ item.num }}</span>
                        </div>
                        <div style="text-align: center;">{{ item.info }}</div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="商店" :visible.sync="shopDialogVisible" width="80%" center :before-close="handleClose">
            <div class="dialog-content">
                <div v-for="( item, index ) in  shop " :key="index" @click="buy(index)">
                    <el-card class="card-item">
                        <div slot="header" style="text-align: center;">
                            <span>{{ item.name }}</span>
                        </div>
                        <div style="text-align: center;">{{ item.info }}</div>
                        <div style="text-align: center;">{{ meArtifact.some(item => item.name == '信用卡') ? item.price * 1 /
                            (2 * meArtifact.find(i => i.name == '信用卡').num) : item.price }}￥</div>
                    </el-card>
                </div>
            </div>
            <div style="text-align: center;margin-top: 10%;">
                <el-button @click="shopDialogVisible = false">继续</el-button>
                <el-button icon="el-icon-user" @click="meCardDialogVisible = true"></el-button>
            </div>
        </el-dialog>
        <el-dialog title="提问" :visible.sync="questionDialogVisible" width="50%" center :before-close="handleClose">
            <div class="dialog-content">
                <el-card class="card-ask">
                    <div slot="header" style="text-align: center;">
                        <span>{{ question.name }}</span>
                    </div>
                    <div class="optionsFlex">
                        <el-button @click="anser(question.name, question.a)">{{ question.a }}</el-button>
                        <el-button @click="anser(question.name, question.b)">{{ question.b }}</el-button>
                        <el-button @click="anser(question.name, question.c)" v-show="question.c">{{ question.c
                        }}</el-button>
                    </div>
                </el-card>
            </div>
        </el-dialog>
        <el-dialog title="我的回答" :visible.sync="meAnserDialogVisible" width="50%" center>
            <div class="dialog-content">
                <div v-for="( item, index ) in  meAnser " :key="index">
                    <el-card class="card-item">
                        <div slot="header" style="text-align: center;">
                            <span>{{ item.name }}</span>
                        </div>
                        <div style="text-align: center;">{{ item.anser }}</div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="boss关奖励" :visible.sync="bossDialogVisible" width="50%" center :before-close="handleClose">
            <div class="dialog-content">
                <div v-for="( item, index ) in  shop" :key="index" @click="buy(index, 'boss')">
                    <el-card class="card-item">
                        <div slot="header" style="text-align: center;">
                            <span>{{ item.name }}</span>
                        </div>
                        <div style="text-align: center;">{{ item.info }}</div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import { bosss1, artifact1, card1, question1 } from '@/utils/index.js';
import { v4 as uuidv4 } from 'uuid';
export default {
    data() {
        return {
            bosss: bosss1,
            artifact: artifact1,
            card: card1,
            question: {},
            card3: [],
            bossDamages: [],
            meDamages: [],
            intervalBossAttack: null,
            intervalBossEnergy: null,
            intervalMeAttack: null,
            intervalMeEnergy: null,
            intervalMe2: null,
            intervalMe3: null,
            intervalMe4: null,
            intervalMe5: null,
            intervalBoss2: null,
            intervalBoss3: null,
            intervalBoss4: null,
            intervalBoss5: null,
            intervalTime: null,
            bossIndex: 0,
            bossActive: {},
            bossArtifact: [],
            meMax: {
                blood: 1650,
                power: 30,
                speed: 100,
            },
            meActive: {
                blood: 1650,
                energy: 0,
                energyRecover: 100,
                power: 30,
                big: 500,
                speed: 100,
                defense: 0,
                reverse: 0,
                critical: 0,
                criticalDamage: 200,
                dodge: 0,
                seriousInjury: 0,
                recover: 0,
                money: 25
            },
            meAttack: [1, 1, 1, 1, 1],
            meArtifact: [
                {
                    name: '曲奇',
                    info: '获得10力量和50生命值',
                    num: 3
                }
            ],
            meCard: [],
            bossCard: [],
            money: 0,
            cardDialogVisible: true,
            meCardDialogVisible: false,
            bossCardDialogVisible: false,
            meAnserDialogVisible: false,
            meAnser: [],
            shopDialogVisible: false,
            shop: [],
            questionDialogVisible: false,
            bossDialogVisible: false,
            time: 0,
            isLessHalf: false,
            meStones: [],
            bossStones: [],
            totalReverse: 0,
            totalMoney: 0,
            totalRecover: 0,
            totalReverseBoss: 0,
            totalRecoverBoss: 0,
        }
    },
    created() {
        this.bossActive = JSON.parse(JSON.stringify(this.bosss[this.bossIndex]));
    },
    mounted() {
        this.drawCard();
    },
    beforeDestroy() {
        this.clearSetInerval();
    },
    computed: {
        quotientReverse() {
            return Math.floor(this.totalReverse / 30);
        },
        quotientReverseBoss() {
            return Math.floor(this.totalReverseBoss / 30);
        },
        quotientMoney() {
            return Math.floor(this.totalMoney / 30);
        },
        quotientRecover() {
            return Math.floor(this.totalRecover / 120);
        },
        quotientRecoverBoss() {
            return Math.floor(this.totalRecoverBoss / 120);
        }
    },
    watch: {
        cardDialogVisible(val) {
            if (val == false) {
                this.meActive.blood = this.meMax.blood;
                this.meActive.power = this.meMax.power;
                this.meActive.speed = this.meMax.speed;
                this.meActive.energy = 0;
                this.addCardBegin();
                this.attack();
            }
        },
        bossActive: {
            handler(newVal, oldVal) {
                if (newVal.blood <= 0) {
                    this.bossIndex++;
                    if (this.bossIndex >= this.bosss.length) {
                        return this.$message.success('恭喜你，通关了！');
                    }
                    this.bossActive = JSON.parse(JSON.stringify(this.bosss[this.bossIndex]));
                    this.drawCard();
                    this.addCardEnd();
                    this.meCardDialogVisible = false;
                    this.cardDialogVisible = true;
                    this.money += this.meActive.money;
                }
                if (newVal.energy <= 0) {
                    this.bossActive.energy = 0;
                }
            },
            deep: true
        },
        meActive: {
            handler(newVal, oldVal) {
                let lv = 2;
                if (this.meArtifact.some(item => item.name == '警笛')) {
                    lv = (100 / ((50 + 15) * this.meArtifact.find(i => i.name == '警笛').num));
                    lv < 1 ? lv = 1 : '';
                }
                let num = 1;
                if (this.meArtifact.some(item => item.name == '口罩')) {
                    num = 1 * this.meArtifact.find(i => i.name == '口罩').num;
                }
                if (newVal.blood <= this.meMax.blood / lv) {
                    if (this.meCard.some(item => item.name == '紧急治疗') && this.isLessHalf == false) {
                        this.meActive.recover += 50 * num * this.meCard.find(i => i.name == '紧急治疗').num;
                    }
                    if (this.meCard.some(item => item.name == '紧急反伤') && this.isLessHalf == false) {
                        this.meActive.reverse += 15 * num * this.meCard.find(i => i.name == '紧急反伤').num;
                    }
                    this.isLessHalf = true;
                } else if (newVal.blood > this.meMax.blood / lv) {
                    if (this.meCard.some(item => item.name == '紧急治疗') && this.isLessHalf == true && this.time !== 0) {
                        this.meActive.recover -= 50 * num * this.meCard.find(i => i.name == '紧急治疗').num;
                    }
                    if (this.meCard.some(item => item.name == '紧急反伤') && this.isLessHalf == true && this.time !== 0) {
                        this.meActive.reverse -= 15 * num * this.meCard.find(i => i.name == '紧急反伤').num;
                    }
                    this.isLessHalf = false;
                }
                if (newVal.blood <= 0) {
                    this.$message.error('你输了！');
                }
                if (newVal.energy <= 0) {
                    this.meActive.energy = 0;
                }
            },
            deep: true
        },
        bossIndex(val) {
            if ([5, 10, 15, 20, 25, 30].includes(val + 1)) {
                this.drawShop(6);
            }
            if ([3, 8, 13, 18, 23, 28].includes(val + 1)) {
                this.ask();
            }
            if ([6, 11, 16, 21, 26].includes(val + 1)) {
                this.drawShop(2);
            }
        },
        time(val) {
            let num = 1;
            if (this.meCard.some(item => item.name == '冲锋强化')) {
                num = 1 * this.meCard.find(i => i.name == '冲锋强化').num;
            }
            let time = 4;
            if (this.meCard.some(item => item.name == '超长待机')) {
                time = 4 + 2 * this.meCard.find(i => i.name == '超长待机').num;
            }
            if (this.meCard.some(item => item.name == '战前治疗') && val == 1) {
                this.meActive.recover += 80 * num * this.meCard.find(i => i.name == '战前治疗').num;
            } else if (this.meCard.some(item => item.name == '战前治疗') && val == time) {
                this.meActive.recover -= 80 * num * this.meCard.find(i => i.name == '战前治疗').num;
            }
            if (this.meCard.some(item => item.name == '急速开局') && val == 1) {
                this.meActive.speed += 20 * num * this.meCard.find(i => i.name == '急速开局').num;
            } else if (this.meCard.some(item => item.name == '急速开局') && val == time) {
                this.meActive.speed -= 20 * num * this.meCard.find(i => i.name == '急速开局').num;
            }
            if (this.meArtifact.some(item => item.name == '寿司') && val == 7) {
                this.meActive.blood += 1000 * this.meArtifact.find(i => i.name == '寿司').num;
            }
            if (val == 1) {
                if (this.meCard.some(item => item.name == '扇巴掌')) {
                    this.generateDamage('boss', 'normal', this.bossActive.blood * 0.1 * this.meCard.find(i => i.name == '扇巴掌').num);
                }
                if (this.meCard.some(item => item.name == '弱化')) {
                    this.bossActive.seriousInjury += 3 * this.meCard.find(i => i.name == '弱化').num;
                }
                if (this.meCard.some(item => item.name == '战前充电')) {
                    this.meActive.energy += 300 * this.meCard.find(i => i.name == '战前充电').num;
                }
            }
            if (val % 6 == 0 && this.meArtifact.some(item => item.name == '咖啡')) {
                if (this.meCard.some(item => item.name == '扇巴掌')) {
                    this.generateDamage('boss', 'normal', this.bossActive.blood * 0.1 * this.meCard.find(i => i.name == '扇巴掌').num);
                }
                if (this.meCard.some(item => item.name == '战前充电')) {
                    this.meActive.energy += 300 * this.meCard.find(i => i.name == '战前充电').num;
                }
            }
        },
        meStones(val) {
            if (val.length >= 10) {
                this.meStones = [];
            }
        },
        bossStones(val) {
            if (val.length >= 10) {
                this.bossStones = [];
            }
        },
        quotientReverse(val) {
            if (val) {
                if (this.meCard.some(item => item.name == '硬斧')) {
                    this.generateDamage('boss', 'normal', 40 * this.meCard.find(i => i.name == '硬斧').num);
                } else {
                    this.generateDamage('boss', 'normal', 40);
                }
                if (this.meArtifact.some(item => item.name == '大蒜')) {
                    this.generateDamage('me', 'heal', 30 * this.meArtifact.find(i => i.name == '大蒜').num);
                }
            }
        },
        quotientReverseBoss(val) {
            if (val) {
                if (this.bossCard.some(item => item.name == '硬斧')) {
                    this.generateDamage('me', 'normal', 40 * this.bossCard.find(i => i.name == '硬斧').num);
                } else {
                    this.generateDamage('me', 'normal', 40);
                }
                if (this.bossArtifact.some(item => item.name == '大蒜')) {
                    this.generateDamage('boss', 'heal', 30 * this.bossArtifact.find(i => i.name == '大蒜').num);
                }
            }
        },
        quotientMoney(val) {
            if (val) {
                if (this.meCard.some(item => item.name == '贪婪')) {
                    this.meMax.power += 1 * this.meCard.find(i => i.name == '贪婪').num;
                    this.meActive.power = this.meMax.power;
                }
            }
        },
        quotientRecover(val) {
            if (val) {
                if (this.meCard.some(item => item.name == '肌肉记忆')) {
                    this.meMax.power += 1 * this.meCard.find(i => i.name == '肌肉记忆').num;
                    this.meActive.power = this.meMax.power;
                }
                if (this.meArtifact.some(item => item.name == '勇敢的心')) {
                    let num = 40;
                    if (this.meArtifact.some(item => item.name == '法棍')) {
                        num = 40 + 10 * this.meArtifact.find(i => i.name == '法棍').num;
                    }
                    if (this.meCard.some(item => item.name == '硬斧')) {
                        this.generateDamage('boss', 'normal', num * this.meCard.find(i => i.name == '硬斧').num * this.meArtifact.find(i => i.name == '勇敢的心').num);
                    } else {
                        this.generateDamage('boss', 'normal', num * this.meArtifact.find(i => i.name == '勇敢的心').num);
                    }
                }
            }
        },
        quotientRecoverBoss(val) {
            if (val) {
                if (this.bossCard.some(item => item.name == '肌肉记忆')) {
                    this.bosss[this.bossIndex].power += 1 * this.bossCard.find(i => i.name == '肌肉记忆').num;
                }
                if (this.bossArtifact.some(item => item.name == '勇敢的心')) {
                    let num = 40;
                    if (this.bossArtifact.some(item => item.name == '法棍')) {
                        num = 40 + 10 * this.bossArtifact.find(i => i.name == '法棍').num;
                    }
                    if (this.bossCard.some(item => item.name == '硬斧')) {
                        this.generateDamage('me', 'normal', num * this.bossCard.find(i => i.name == '硬斧').num * this.bossArtifact.find(i => i.name == '勇敢的心').num);
                    } else {
                        this.generateDamage('me', 'normal', num * this.bossArtifact.find(i => i.name == '勇敢的心').num);
                    }
                }
            }
        },
    },
    methods: {
        generateDamage(to, damageType, damageValue) {
            const damageId = uuidv4();
            const damagePosition = this.getRandomPosition();
            if (to == 'boss') {
                if (damageType == 'heal') {
                    this.bossDamages.push({
                        id: damageId,
                        value: damageValue,
                        type: damageType,
                        style: damagePosition,
                    });
                    this.bossActive.blood += damageValue;
                    this.totalRecoverBoss += damageValue;
                    if (this.bossActive.blood > this.bosss[this.bossIndex].blood) {
                        this.bossActive.blood = this.bosss[this.bossIndex].blood;
                    }
                } else {
                    let num = Math.floor(Math.random() * 100);
                    if (num < this.meActive.critical) {
                        damageValue = damageValue * (this.meActive.criticalDamage / 100);
                        damageType = 'critical';
                    }
                    let damage = damageValue - this.bossActive.defense + this.bossActive.seriousInjury;
                    num = Math.floor(Math.random() * 100);
                    if (num < this.bossActive.dodge) {
                        damage = 0
                        damageType = 'dodge';
                    }
                    this.bossDamages.push({
                        id: damageId,
                        value: damage,
                        type: damageType,
                        style: damagePosition,
                    });
                    this.bossActive.blood -= damage;
                    if (this.bossActive.blood <= 0) {
                        this.bossActive.blood = 0;
                        this.clearSetInerval();
                    }
                }
            } else if (to == 'me') {
                if (damageType == 'heal') {
                    this.meDamages.push({
                        id: damageId,
                        value: damageValue,
                        type: damageType,
                        style: damagePosition,
                    });
                    this.meActive.blood += damageValue;
                    this.totalRecover += damageValue;
                    if (this.meActive.blood > this.meMax.blood) {
                        this.meActive.blood = this.meMax.blood;
                    }
                } else {
                    let num = Math.floor(Math.random() * 100);
                    if (num < this.bossActive.critical) {
                        damageValue = damageValue * (this.bossActive.criticalDamage / 100);
                        damageType = 'critical';
                    }
                    let damage = damageValue - this.meActive.defense + this.meActive.seriousInjury;
                    num = Math.floor(Math.random() * 100);
                    if (num < this.meActive.dodge) {
                        damage = 0
                        damageType = 'dodge';
                        if (this.meCard.some(item => item.name === '明镜止水')) {
                            this.bossActive.energy -= 20 * this.meCard.find(i => i.name == '明镜止水').num;
                        }
                        if (this.meArtifact.some(item => item.name === '蝴蝶')) {
                            this.meActive.blood += 10 * this.meArtifact.find(i => i.name == '蝴蝶').num;
                        }
                    }
                    this.meDamages.push({
                        id: damageId,
                        value: damage,
                        type: damageType,
                        style: damagePosition,
                    });
                    this.meActive.blood -= damage;
                    if (this.meActive.blood <= 0) {
                        this.meActive.blood = 0;
                        this.clearSetInerval();
                    }
                }
            }
            // 设置延时后移除该伤害数值
            setTimeout(() => {
                this.bossDamages = this.bossDamages.filter(damage => damage.id !== damageId);
                this.meDamages = this.meDamages.filter(damage => damage.id !== damageId);
            }, 1000);
        },
        getRandomPosition() {
            // 生成随机位置
            const maxOffset = 50; // 假设伤害数值弹出的最大偏移量
            const x = Math.random() * maxOffset * 5 - maxOffset; // -maxOffset 到 maxOffset
            const y = Math.random() * maxOffset * 5 - maxOffset; // -maxOffset 到 maxOffset
            return {
                left: `${x}px`,
                top: `${y}px`,
            };
        },
        formatBossBlood() {
            return Math.floor(this.bossActive.blood) + '/' + this.bosss[this.bossIndex].blood;
        },
        formatBossPower() {
            return this.bossActive.energy + '/1000';
        },
        formatMeBlood() {
            return Math.floor(this.meActive.blood) + '/' + this.meMax.blood;
        },
        formatMePower() {
            return this.meActive.energy + '/1000';
        },
        attack() {
            //计时
            this.intervalTime = setInterval(() => {
                this.time++;
            }, 1000);
            setTimeout(() => {
                //我打boss
                this.intervalMeAttack = setInterval(() => {
                    this.throwStone('boss');
                    if (this.meCard.some(item => item.name == '硬化石头')) {
                        this.generateDamage('boss', 'normal', Math.floor(this.meActive.power * (1 + 0.3 * this.meCard.find(i => i.name == '硬化石头').num)));
                    } else {
                        this.generateDamage('boss', 'normal', this.meActive.power);
                    }
                    //如果boss有反伤
                    if (this.bossActive.reverse > 0) {
                        if (this.bossArtifact.some(item => item.name == '筷子')) {
                            this.generateDamage('me', 'reverse', (this.bossActive.reverse + this.meActive.seriousInjury) * (1 + this.bossArtifact.find(i => i.name == '筷子').num));
                        } else {
                            this.generateDamage('me', 'reverse', this.bossActive.reverse + this.meActive.seriousInjury);
                        }
                        if (this.bossCard.some(item => item.name == '复仇')) {
                            this.totalReverse += (this.bossActive.reverse + this.meActive.seriousInjury) * this.bossCard.find(i => i.name == '复仇').num;
                        }
                    }
                }, (1000 / (this.meActive.speed / 100)) / this.meAttack.filter((item) => { return item == 1 }).length);
                this.intervalMeEnergy = setInterval(() => {
                    //我的能量
                    this.meActive.energy += this.meActive.energyRecover;
                    if (this.meActive.energy >= 1000) {
                        let num = Math.floor(Math.random() * 100);
                        if (this.bossArtifact.some(item => item.name === '钝角') && num < this.bossActive.dodge) {
                            this.$message.warning('对手闪避你的大招!');
                        } else {
                            if (this.meArtifact.some(item => item.name == '小刀')) {
                                num = Math.floor(Math.random() * 100);
                                if (num < this.meActive.critical) {
                                    this.generateDamage('boss', 'normal', (this.meActive.big + this.meActive.power) * (this.meActive.criticalDamage / 100));
                                }
                            } else {
                                this.generateDamage('boss', 'normal', this.meActive.big + this.meActive.power);
                            }
                            if (this.meCard.some(item => item.name == '松口气')) {
                                this.generateDamage('me', 'heal', 250 * this.meCard.find(i => i.name == '松口气').num);
                            }
                            if (this.meCard.some(item => item.name == '蓄能大招')) {
                                this.meActive.energy += 190 * this.meCard.find(i => i.name == '蓄能大招').num;
                            }
                        }
                        this.meActive.energy = 0;
                    }
                    //我的恢复血量
                    this.meActive.recover > 0 ? this.generateDamage('me', 'heal', this.meActive.recover) : '';
                    if (this.meCard.some(item => item.name == '自我治疗')) {
                        this.generateDamage('me', 'heal', this.meActive.power * this.meCard.find(i => i.name == '自我治疗').num);
                    }
                }, 1000);
                //我的肌肉
                if (this.meAttack.includes(2)) {
                    this.intervalMe2 = setInterval(() => {
                        this.meActive.power += 1;
                        if (this.meCard.some(item => item.name == '野兽心态')) {
                            this.meActive.speed += 1 * this.meCard.find(i => i.name == '野兽心态').num;
                        }
                    }, (1000 / (this.meActive.speed / 100)) / this.meAttack.filter((item) => { return item == 2 }).length);
                }
                //我的脑子
                if (this.meAttack.includes(3)) {
                    this.intervalMe3 = setInterval(() => {
                        if (this.meCard.some(item => item.name == '学习')) {
                            this.bossActive.energy -= 20 + 10 * this.meCard.find(i => i.name == '学习').num;
                        } else {
                            this.bossActive.energy -= 20;
                        }
                        if (this.meCard.some(item => item.name == '经济学家')) {
                            this.generateDamage('boss', 'normal', this.meActive.money * this.meCard.find(i => i.name == '经济学家').num);
                        }
                    }, (1000 / (this.meActive.speed / 100)) / this.meAttack.filter((item) => { return item == 3 }).length);
                }
                //我的斧子
                if (this.meAttack.includes(4)) {
                    this.intervalMe4 = setInterval(() => {
                        let num = 40;
                        if (this.meArtifact.some(item => item.name == '法棍')) {
                            num = 40 + 10 * this.meArtifact.find(i => i.name == '法棍').num;
                        }
                        if (this.meCard.some(item => item.name == '硬斧')) {
                            this.generateDamage('boss', 'normal', num * (1 + this.meCard.find(i => i.name == '硬斧').num));
                        } else {
                            this.generateDamage('boss', 'normal', num);
                        }
                    }, (1000 / (this.meActive.speed / 100)) / this.meAttack.filter((item) => { return item == 4 }).length);
                }
                //我的吸血鬼
                if (this.meAttack.includes(5)) {
                    this.intervalMe5 = setInterval(() => {
                        if (this.meCard.some(item => item.name == '我是真饿了')) {
                            this.generateDamage('boss', 'normal', 3);
                            this.generateDamage('me', 'heal', 3 * this.meCard.find(i => i.name == '我是真饿了').num);
                            this.meMax.blood += 3 * this.meCard.find(i => i.name == '我是真饿了').num;
                        } else {
                            this.generateDamage('boss', 'normal', 3);
                            this.generateDamage('me', 'heal', 3);
                            this.meMax.blood += 3;
                        }
                    }, (1000 / (this.meActive.speed / 100)) / this.meAttack.filter((item) => { return item == 5 }).length);
                }
                //boss打我
                this.intervalBossAttack = setInterval(() => {
                    this.throwStone('me');
                    if (this.bossCard.some(item => item.name == '硬化石头')) {
                        this.generateDamage('me', 'normal', Math.floor(this.bossActive.power * (1 + 0.3 * this.bossCard.find(i => i.name == '硬化石头').num)));
                    } else {
                        this.generateDamage('me', 'normal', this.bossActive.power);
                    }
                    //如果me有反伤
                    if (this.meActive.reverse > 0) {
                        if (this.meArtifact.some(item => item.name == '筷子')) {
                            this.generateDamage('boss', 'reverse', (this.meActive.reverse + this.bossActive.seriousInjury) * (1 + this.meArtifact.find(i => i.name == '筷子').num));
                        } else {
                            this.generateDamage('boss', 'reverse', this.meActive.reverse + this.bossActive.seriousInjury);
                        }
                        if (this.meCard.some(item => item.name == '复仇')) {
                            this.totalReverse += (this.meActive.reverse + this.bossActive.seriousInjury) * this.meCard.find(i => i.name == '复仇').num;
                        }
                    }
                }, (1000 / (this.bossActive.speed / 100)) / this.bossActive.attack.filter((item) => { return item == 1 }).length);
                this.intervalBossEnergy = setInterval(() => {
                    //boss能量
                    this.bossActive.energy += this.bossActive.energyRecover;
                    if (this.bossActive.energy >= 1000) {
                        this.bossActive.energy = 0;
                        let num = Math.floor(Math.random() * 100);
                        if (this.meArtifact.some(item => item.name === '钝角') && num < this.meActive.dodge) {
                            this.$message.warning('闪避boss的大招!');
                        } else {
                            if (this.bossArtifact.some(item => item.name == '小刀')) {
                                num = Math.floor(Math.random() * 100);
                                if (num < this.bossActive.critical) {
                                    this.generateDamage('me', 'normal', (this.bossActive.big + this.bossActive.power) * (this.bossActive.criticalDamage / 100));
                                }
                            } else {
                                this.generateDamage('me', 'normal', this.bossActive.big + this.bossActive.power);
                            }
                            if (this.bossCard.some(item => item.name == '松口气')) {
                                this.generateDamage('boss', 'heal', 250 * this.bossCard.find(i => i.name == '松口气').num);
                            }
                            if (this.bossCard.some(item => item.name == '蓄能大招')) {
                                this.bossActive.energy += 190 * this.bossCard.find(i => i.name == '蓄能大招').num;
                            }
                        }
                    }
                    //boss恢复血量
                    this.bossActive.recover > 0 ? this.generateDamage('boss', 'heal', this.bossActive.recover) : '';
                    if (this.bossCard.some(item => item.name == '自我治疗')) {
                        this.generateDamage('boss', 'heal', this.bossActive.power * this.bossCard.find(i => i.name == '自我治疗').num);
                    }
                }, 1000);
                //boss肌肉
                if (this.bossActive.attack.includes(2)) {
                    this.intervalBoss2 = setInterval(() => {
                        this.meActive.power += 1;
                        if (this.meCard.some(item => item.name == '野兽心态')) {
                            this.meActive.speed += 1 * this.meCard.find(i => i.name == '野兽心态').num;
                        }
                    }, (1000 / (this.meActive.speed / 100)) / this.bossActive.attack.filter((item) => { return item == 2 }).length);
                }
                //boss脑子
                if (this.bossActive.attack.includes(3)) {
                    this.intervalBoss3 = setInterval(() => {
                        if (this.bossCard.some(item => item.name == '学习')) {
                            this.meActive.energy -= 20 + 10 * this.bossCard.find(i => i.name == '学习').num;
                        } else {
                            this.meActive.energy -= 20;
                        }
                        if (this.bossCard.some(item => item.name == '经济学家')) {
                            this.generateDamage('me', 'normal', this.bossActive.money * this.bossCard.find(i => i.name == '经济学家').num);
                        }
                    }, (1000 / (this.bossActive.speed / 100)) / this.bossActive.attack.filter((item) => { return item == 3 }).length);
                }
                //boss斧子
                if (this.bossActive.attack.includes(4)) {
                    this.intervalBoss4 = setInterval(() => {
                        let num = 40;
                        if (this.bossArtifact.some(item => item.name == '法棍')) {
                            num = 40 + 10 * this.bossArtifact.find(i => i.name == '法棍').num;
                        }
                        if (this.bossCard.some(item => item.name == '硬斧')) {
                            this.generateDamage('me', 'normal', num * (1 + this.bossCard.find(i => i.name == '硬斧').num));
                        } else {
                            this.generateDamage('me', 'normal', num);
                        }
                    }, (1000 / (this.bossActive.speed / 100)) / this.bossActive.attack.filter((item) => { return item == 4 }).length);
                }
                //boss吸血鬼
                if (this.bossActive.attack.includes(5)) {
                    this.intervalBoss5 = setInterval(() => {
                        if (this.bossCard.some(item => item.name == '我是真饿了')) {
                            this.generateDamage('me', 'normal', 3);
                            this.generateDamage('boss', 'heal', 3 * this.bossCard.find(i => i.name == '我是真饿了').num);
                            this.bosss1[index].blood += 3 * this.bossCard.find(i => i.name == '我是真饿了').num;
                        } else {
                            this.generateDamage('me', 'normal', 3);
                            this.generateDamage('boss', 'heal', 3);
                            this.bosss1[index].blood += 3;
                        }
                    }, (1000 / (this.bossActive.speed / 100)) / this.bossActive.attack.filter((item) => { return item == 5 }).length);
                }
            }, 1000);
        },
        clearSetInerval() {
            clearInterval(this.intervalBossAttack);
            clearInterval(this.intervalBossEnergy);
            clearInterval(this.intervalMeAttack);
            clearInterval(this.intervalMeEnergy);
            clearInterval(this.intervalMe2);
            clearInterval(this.intervalMe3);
            clearInterval(this.intervalMe4);
            clearInterval(this.intervalMe5);
            clearInterval(this.intervalTime);
            this.time = 0;
        },
        handleClose() {
            return this.$message.info('请选择强化');
        },
        //加入立即类能力
        joinCard(power) {
            if (this.meCard.indexOf(power) == -1) {
                this.meCard.push(power);
            } else {
                this.meCard[this.meCard.indexOf(power)].num += 1;
            }
            if (this.meArtifact.some(item => item.name == '金色传说') && power.color == 'rgb(242,175,89)') {
                this.money += 100 * this.meArtifact.find(i => i.name == '金色传说').num;
            }
            if (this.meArtifact.some(item => item.name == '史诗圣典') && power.color == 'rgb(193,109,253)') {
                this.money += 50 * this.meArtifact.find(i => i.name == '史诗圣典').num;
            }
            if (this.meArtifact.some(item => item.name == '稀有典籍') && power.color == 'lightblue') {
                this.money += 20 * this.meArtifact.find(i => i.name == '稀有典籍').num;
            }
            this.cardDialogVisible = false;
            if (power.name == "篮球") {
                this.meAttack.push(1)
            } else if (power.name == "力量") {
                this.meMax.power += 5;
            } else if (power.name == "回血") {
                this.meActive.recover += 25;
            } else if (power.name == "肌肉") {
                this.meAttack.push(2);
            } else if (power.name == "橄榄球") {
                this.meAttack.push(3);
            } else if (power.name == "刀叉") {
                this.meAttack.push(4);
            } else if (power.name == "饿了么") {
                this.meAttack.push(5);
            } else if (power.name == "闪避") {
                this.meActive.dodge += 5;
            } else if (power.name == "暴击") {
                this.meActive.critical += 5;
            } else if (power.name == "硬汉") {
                this.meActive.recover += this.meMax.blood * 0.02;
            } else if (power.name == "金币") {
                this.money += 400;
            } else if (power.name == "尖刺") {
                this.meActive.reverse += 6;
            } else if (power.name == "收入提升") {
                this.meActive.money += 10;
            } else if (power.name == "带刺护甲") {
                this.meActive.defense += 3;
                this.meActive.reverse += 4;
            } else if (power.name == "速度提升") {
                this.meMax.speed += 10;
            } else if (power.name == "暴击伤害提升") {
                this.meActive.criticalDamage += 60;
            } else if (power.name == "大招伤害") {
                this.meActive.big += this.meActive.big * 0.3;
            } else if (power.name == '能量恢复') {
                this.meActive.energyRecover += 40;
            }
        },
        //抽牌
        drawCard(num) {
            if (num) {
                if (this.money < num) {
                    return this.$message.warning('金币不足');
                }
                this.money -= num;
            }
            this.card3 = [];
            for (let i = 0; i < 3; i++) {
                let num = Math.random();
                if (num <= 0.5) {
                    let index = Math.floor(Math.random() * this.card[0].length);
                    this.card3.indexOf(this.card[0][index]) == -1 ? this.card3.push(this.card[0][index]) : "";
                } else if (num > 0.5 && num <= 0.8) {
                    let index = Math.floor(Math.random() * this.card[1].length);
                    this.card3.indexOf(this.card[1][index]) == -1 ? this.card3.push(this.card[1][index]) : "";
                } else if (num > 0.8 && num <= 0.95) {
                    let index = Math.floor(Math.random() * this.card[2].length);
                    this.card3.indexOf(this.card[2][index]) == -1 ? this.card3.push(this.card[2][index]) : "";
                } else if (num > 0.95 && num <= 1) {
                    let index = Math.floor(Math.random() * this.card[3].length);
                    this.card3.indexOf(this.card[3][index]) == -1 ? this.card3.push(this.card[3][index]) : "";
                }
            }
            if (this.card3.length < 3) {
                this.drawCard();
            }
        },
        //加入回合类强化(开始触发)
        addCardBegin() {
            if (this.meCard.some(item => item.name === '有氧运动')) {
                this.meActive.blood += this.meMax.power * 12 * this.meCard.find(i => i.name == '有氧运动').num;
            }
            if (this.bossCard.some(item => item.name === '有氧运动')) {
                this.bossActive.blood += this.bosss[this.bossIndex].power * 12 * this.bossCard.find(i => i.name == '有氧运动').num;
            }
        },
        //加入回合类强化(结束触发)
        addCardEnd() {
            if (this.meCard.some(item => item.name === '加油')) {
                this.meMax.power += 1 * this.meCard.find(i => i.name == '加油').num;
            }
            if (this.meCard.some(item => item.name === '任务:反伤')) {
                this.meMax.reverse += 1 * this.meCard.find(i => i.name == '任务:反伤').num;
            }
            if (this.meCard.some(item => item.name === '怒气积攒')) {
                this.meActive.critical += 1 * this.meCard.find(i => i.name == '怒气积攒').num;
            }
            if (this.meCard.some(item => item.name === '打坐')) {
                this.meMax.recover += 5 * this.meCard.find(i => i.name == '打坐').num;
            }
            if (this.meArtifact.some(item => item.name === '终点线')) {
                this.meMax.speed += 3 * this.meArtifact.find(i => i.name == '终点线').num;
            }
            if (this.meArtifact.some(item => item.name === '鱿鱼')) {
                this.meActive.money += 4 * this.meArtifact.find(i => i.name == '鱿鱼').num;
            }
        },
        //商店
        drawShop(num) {
            num == 6 ? this.shopDialogVisible = true : this.bossDialogVisible = true;
            this.shop = [];
            for (let i = 0; i < num; i++) {
                let index = Math.floor(Math.random() * this.artifact.length);
                this.shop.indexOf(this.artifact[index]) == -1 ? this.shop.push(this.artifact[index]) : "";
            }
            if (this.shop.length < num) {
                this.drawShop(num);
            }
        },
        //购买
        buy(index, name) {
            if (this.money >= this.shop[index].price || name == 'boss') {
                if (this.meArtifact.indexOf(this.shop[index]) == -1) {
                    this.meArtifact.push(this.shop[index]);
                } else {
                    this.meArtifact[this.meArtifact.indexOf(this.shop[index])].num += 1;
                }
                if (this.shop[index].name == '龙心') {
                    this.meMax.blood += 250;
                    this.meMax.power += 5;
                    this.meActive.recover += this.meMax.blood * 0.1;
                } else if (this.shop[index].name == '饭团') {
                    this.meActive.recover += 25;
                    this.meActive.energyRecover += 75;
                } else if (this.shop[index].name == '红包') {
                    this.meActive.money += 25;
                } else if (this.shop[index].name == '快餐') {
                    this.meMax.blood += 700;
                    this.meActive.seriousInjury += 3;
                } else if (this.shop[index].name == '马') {
                    this.meMax.blood += 200;
                    this.meAttack.push(2);
                } else if (this.shop[index].name == '苹果') {
                    this.meActive.defense += 8;
                } else if (this.shop[index].name == '唱跳rap篮球') {
                    this.meAttack.push(1, 1);
                } else if (this.shop[index].name == '该健身了') {
                    this.meAttack.push(2, 2);
                } else if (this.shop[index].name == '橄榄你') {
                    this.meAttack.push(3, 3);
                } else if (this.shop[index].name == '冷兵器时代') {
                    this.meAttack.push(4, 4);
                } else if (this.shop[index].name == '真的饿了') {
                    this.meAttack.push(5, 5);
                } else if (this.shop[index].name == 'UPHONE') {
                    this.meMax.blood += 600;
                    this.meActive.blood = this.meMax.blood;
                    this.meActive.critical += 6;
                } else if (this.shop[index].name == '小刀') {
                    this.meActive.critical += 6;
                } else if (this.shop[index].name == '笑脸') {
                    this.meActive.critical += 4;
                    this.meActive.dodge += 4;
                    this.meMax.speed += 4;
                    this.meMax.power += 4;
                } else if (this.shop[index].name == '西兰花') {
                    this.meActive.seriousInjury -= 6;
                } else if (this.shop[index].name == '红辣椒') {
                    this.meMax.speed += 25;
                } else if (this.shop[index].name == '筷子') {
                    this.meActive.seriousInjury += 3;
                } else if (this.shop[index].name == '仙人掌') {
                    this.meMax.reverse += 10;
                } else if (this.shop[index].name == '信用卡') {
                    this.meActive.money -= 25;
                    this.meActive.money < 0 ? this.meActive.money = 0 : '';
                }
                if (name == 'boss') {
                    this.bossDialogVisible = false;
                } else {
                    let num = 1;
                    if (this.meArtifact.some(item => item.name == '信用卡')) {
                        num = 1 / (2 * this.meArtifact.find(i => i.name == '信用卡').num);
                    }
                    this.money -= this.shop[index].price * num;
                    this.totalMoney += this.shop[index].price * num;
                    this.shop.splice(index, 1);
                }
            } else {
                return this.$message.warning("金币不足");
            }
        },
        //提问
        ask() {
            this.question = question1[Math.floor(Math.random() * question1.length)];
            this.questionDialogVisible = true;
        },
        //回答
        anser(n, a) {
            this.meAnser.push({ name: n, anser: a });
            this.questionDialogVisible = false;
            if (a == '篮球(获得篮球+1和200血量)') {
                this.meMax.blood += 200;
                this.meAttack.push(1);
            } else if (a == '橄榄球(获得橄榄球+1和200血量)') {
                this.meMax.blood += 200;
                this.meAttack.push(3);
            } else if (a == '1(获得5%暴击)') {
                this.meActive.critical += 5;
            } else if (a == '0(获得5%闪避)') {
                this.meActive.dodge += 5;
            } else if (a == '三明治的馅儿(获得700血量和3重伤)') {
                this.meMax.blood += 700;
                this.meActive.seriousInjury += 3;
            }
        },
        //扔石头
        throwStone(to) {
            const randomLeft = Math.floor(Math.random() * 300);
            if (to == 'boss') {
                this.meStones.push({ top: 200, left: randomLeft, fade: false });
            } else {
                this.bossStones.push({ top: 200, left: randomLeft, fade: false });
            }
            setTimeout(() => {
                this.meStones = this.meStones.filter(item => !item.fade);
                this.bossStones = this.bossStones.filter(item => !item.fade);
            }, 1000);
        }
    },
}
</script>
  
<style scoped>
.mainBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 85vh;
}

.boss {
    width: 200px;
    height: 200px;
}

.character {
    position: relative;
    margin: 5vh 0 0 20vw;
}

.damage-popup {
    position: absolute;
    font-size: 1.5em;
    padding: 5px;
    border-radius: 5px;
    animation: popup 0.5s ease-out forwards;
}

.damage-popup.normal {
    color: grey;
}

.damage-popup.critical {
    color: lightcoral;
}

.damage-popup.heal {
    color: lightgreen;
}

.damage-popup.reverse {
    color: yellow;
}

.damage-popup.dodge {
    color: lightblue;
}

@keyframes popup {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateY(-20%);
    }
}

.attack {
    position: relative;
    left: 35%;
}

.stone {
    position: absolute;
    animation: throw 1s ease-in-out forwards;
}

@keyframes throw {
    0% {
        transform: translateY(-2200%);
        opacity: 1;
    }

    100% {
        transform: translateY(-500%);
        opacity: 0;
    }
}

.stone1 {
    position: absolute;
    animation: throw1 1s ease-in-out forwards;
}

@keyframes throw1 {
    0% {
        transform: translateY(-500%);
        opacity: 1;
    }

    100% {
        transform: translateY(-1500%);
        opacity: 0;
    }
}

.dialog-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.progress {
    position: relative;
    right: 5vw;
}

.progress-bar {
    width: 20vw;
}

.header {
    display: flex;
    justify-content: space-between;
}

.mePower {
    width: 22vw;
    height: 15vh;
    overflow: auto;
}

.meAttack {
    width: 22vw;
    height: 15vh;
    margin: 2vh 0;
    background-color: rgb(22, 24, 28);
    border-radius: 25px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    overflow: auto;
}

.meAttack::-webkit-scrollbar {
    display: none;
}

.meItem {
    width: 22vw;
    height: 50vh;
    background-color: rgb(22, 24, 28);
    border-radius: 25px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    overflow: auto;
}

.bossAttack {
    margin-left: 2vw;
}

.headerText {
    font-size: 2.5em;
    font-weight: bold;
    color: rgb(22, 24, 28);
    line-height: 8vh;
}

.meItemText {
    display: flex;
    justify-content: space-around;
}

.item {
    margin: 2%;
    cursor: pointer;
}

.dialog-content {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.card-item {
    width: 10vw;
    height: 20vh;
}

.card-ask {
    width: 50vw;
}

.optionsFlex {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}

.optionsFlex .el-button {
    width: 100%;
    margin: 1%;
}
</style>
  