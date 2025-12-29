// 증강 데이터
const AUGMENT_DATA = {
    champions: {
        "가렌": {
            tier: "A",
            silver: {
                "S+": [
                    { name: "용맹함", pickRate: 15.2 },
                    { name: "승리의 함성", pickRate: 12.8 },
                    { name: "강철의 의지", pickRate: 10.5 }
                ],
                "S": [
                    { name: "돌진", pickRate: 8.3 },
                    { name: "방어 태세", pickRate: 7.1 }
                ]
            },
            gold: {
                "S+": [
                    { name: "용맹함", pickRate: 16.5 },
                    { name: "승리의 함성", pickRate: 13.2 },
                    { name: "강철의 의지", pickRate: 11.0 }
                ],
                "S": [
                    { name: "돌진", pickRate: 8.8 },
                    { name: "방어 태세", pickRate: 7.5 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "용맹함", pickRate: 18.0 },
                    { name: "승리의 함성", pickRate: 14.5 },
                    { name: "강철의 의지", pickRate: 12.3 }
                ],
                "S": [
                    { name: "돌진", pickRate: 9.2 },
                    { name: "방어 태세", pickRate: 8.0 }
                ]
            }
        },
        "진": {
            tier: "S+",
            silver: {
                "S+": [
                    { name: "치명타 강화", pickRate: 18.5 },
                    { name: "속사포", pickRate: 15.2 },
                    { name: "완벽한 연출", pickRate: 12.8 },
                    { name: "예술적 재능", pickRate: 10.3 },
                    { name: "4발의 고통", pickRate: 8.7 }
                ],
                "S": [
                    { name: "탄환 폭풍", pickRate: 7.2 },
                    { name: "저격수의 집중", pickRate: 6.5 },
                    { name: "관통력 증가", pickRate: 5.8 }
                ]
            },
            gold: {
                "S+": [
                    { name: "치명타 강화", pickRate: 19.2 },
                    { name: "속사포", pickRate: 16.0 },
                    { name: "완벽한 연출", pickRate: 13.5 },
                    { name: "예술적 재능", pickRate: 11.0 },
                    { name: "4발의 고통", pickRate: 9.3 }
                ],
                "S": [
                    { name: "탄환 폭풍", pickRate: 7.8 },
                    { name: "저격수의 집중", pickRate: 7.0 },
                    { name: "관통력 증가", pickRate: 6.2 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "치명타 강화", pickRate: 20.5 },
                    { name: "속사포", pickRate: 17.3 },
                    { name: "완벽한 연출", pickRate: 14.8 },
                    { name: "예술적 재능", pickRate: 12.2 },
                    { name: "4발의 고통", pickRate: 10.0 }
                ],
                "S": [
                    { name: "탄환 폭풍", pickRate: 8.5 },
                    { name: "저격수의 집중", pickRate: 7.7 },
                    { name: "관통력 증가", pickRate: 6.8 }
                ]
            }
        },
        "아리": {
            tier: "S",
            silver: {
                "S+": [
                    { name: "매혹의 강화", pickRate: 16.8 },
                    { name: "영혼 인도자", pickRate: 14.2 },
                    { name: "구미호의 민첩함", pickRate: 11.5 },
                    { name: "마법 폭발", pickRate: 9.8 }
                ],
                "S": [
                    { name: "여우불", pickRate: 7.5 },
                    { name: "정수 흡수", pickRate: 6.8 }
                ]
            },
            gold: {
                "S+": [
                    { name: "매혹의 강화", pickRate: 17.5 },
                    { name: "영혼 인도자", pickRate: 15.0 },
                    { name: "구미호의 민첩함", pickRate: 12.3 },
                    { name: "마법 폭발", pickRate: 10.5 }
                ],
                "S": [
                    { name: "여우불", pickRate: 8.0 },
                    { name: "정수 흡수", pickRate: 7.2 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "매혹의 강화", pickRate: 18.8 },
                    { name: "영혼 인도자", pickRate: 16.2 },
                    { name: "구미호의 민첩함", pickRate: 13.5 },
                    { name: "마법 폭발", pickRate: 11.3 }
                ],
                "S": [
                    { name: "여우불", pickRate: 8.7 },
                    { name: "정수 흡수", pickRate: 7.8 }
                ]
            }
        },
        "야스오": {
            tier: "S",
            silver: {
                "S+": [
                    { name: "바람의 벽 강화", pickRate: 17.3 },
                    { name: "질풍검", pickRate: 14.8 },
                    { name: "검술의 달인", pickRate: 12.2 },
                    { name: "돌풍", pickRate: 10.0 }
                ],
                "S": [
                    { name: "강철 폭풍", pickRate: 8.3 },
                    { name: "바람 장막", pickRate: 7.2 }
                ]
            },
            gold: {
                "S+": [
                    { name: "바람의 벽 강화", pickRate: 18.0 },
                    { name: "질풍검", pickRate: 15.5 },
                    { name: "검술의 달인", pickRate: 13.0 },
                    { name: "돌풍", pickRate: 10.8 }
                ],
                "S": [
                    { name: "강철 폭풍", pickRate: 8.8 },
                    { name: "바람 장막", pickRate: 7.7 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "바람의 벽 강화", pickRate: 19.2 },
                    { name: "질풍검", pickRate: 16.8 },
                    { name: "검술의 달인", pickRate: 14.3 },
                    { name: "돌풍", pickRate: 11.7 }
                ],
                "S": [
                    { name: "강철 폭풍", pickRate: 9.5 },
                    { name: "바람 장막", pickRate: 8.3 }
                ]
            }
        },
        "럭스": {
            tier: "S+",
            silver: {
                "S+": [
                    { name: "빛의 속박 강화", pickRate: 15.5 },
                    { name: "최후의 섬광", pickRate: 13.2 },
                    { name: "광휘", pickRate: 11.0 }
                ],
                "S": [
                    { name: "투과의 특이점", pickRate: 9.2 },
                    { name: "빛의 방패", pickRate: 7.8 }
                ]
            },
            gold: {
                "S+": [
                    { name: "빛의 속박 강화", pickRate: 16.3 },
                    { name: "최후의 섬광", pickRate: 14.0 },
                    { name: "광휘", pickRate: 11.8 }
                ],
                "S": [
                    { name: "투과의 특이점", pickRate: 9.8 },
                    { name: "빛의 방패", pickRate: 8.3 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "빛의 속박 강화", pickRate: 17.5 },
                    { name: "최후의 섬광", pickRate: 15.2 },
                    { name: "광휘", pickRate: 12.8 }
                ],
                "S": [
                    { name: "투과의 특이점", pickRate: 10.5 },
                    { name: "빛의 방패", pickRate: 9.0 }
                ]
            }
        },
        "제드": {
            tier: "A",
            silver: {
                "S+": [
                    { name: "그림자 베기", pickRate: 18.2 },
                    { name: "죽음의 표식", pickRate: 15.7 },
                    { name: "살아있는 그림자", pickRate: 13.0 },
                    { name: "수리검 난무", pickRate: 10.8 }
                ],
                "S": [
                    { name: "그림자 분신", pickRate: 8.5 },
                    { name: "암살자의 직감", pickRate: 7.3 }
                ]
            },
            gold: {
                "S+": [
                    { name: "그림자 베기", pickRate: 19.0 },
                    { name: "죽음의 표식", pickRate: 16.5 },
                    { name: "살아있는 그림자", pickRate: 13.8 },
                    { name: "수리검 난무", pickRate: 11.5 }
                ],
                "S": [
                    { name: "그림자 분신", pickRate: 9.0 },
                    { name: "암살자의 직감", pickRate: 7.8 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "그림자 베기", pickRate: 20.3 },
                    { name: "죽음의 표식", pickRate: 17.8 },
                    { name: "살아있는 그림자", pickRate: 15.0 },
                    { name: "수리검 난무", pickRate: 12.5 }
                ],
                "S": [
                    { name: "그림자 분신", pickRate: 9.7 },
                    { name: "암살자의 직감", pickRate: 8.5 }
                ]
            }
        },
        "카타리나": {
            tier: "B",
            silver: {
                "S+": [
                    { name: "죽음의 연꽃", pickRate: 17.5 },
                    { name: "순보", pickRate: 14.8 },
                    { name: "튕기는 칼날", pickRate: 12.3 }
                ],
                "S": [
                    { name: "암살", pickRate: 10.0 },
                    { name: "재빠른 발놀림", pickRate: 8.5 }
                ]
            },
            gold: {
                "S+": [
                    { name: "죽음의 연꽃", pickRate: 18.3 },
                    { name: "순보", pickRate: 15.5 },
                    { name: "튕기는 칼날", pickRate: 13.0 }
                ],
                "S": [
                    { name: "암살", pickRate: 10.7 },
                    { name: "재빠른 발놀림", pickRate: 9.2 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "죽음의 연꽃", pickRate: 19.7 },
                    { name: "순보", pickRate: 16.8 },
                    { name: "튕기는 칼날", pickRate: 14.2 }
                ],
                "S": [
                    { name: "암살", pickRate: 11.5 },
                    { name: "재빠른 발놀림", pickRate: 10.0 }
                ]
            }
        },
        "징크스": {
            tier: "S+",
            silver: {
                "S+": [
                    { name: "초강력 로켓", pickRate: 19.8 },
                    { name: "폭발 도가니", pickRate: 16.5 },
                    { name: "신나서!", pickRate: 14.0 },
                    { name: "화염 방사기", pickRate: 11.3 }
                ],
                "S": [
                    { name: "번개 총", pickRate: 9.2 },
                    { name: "불꽃 튀는 날뛰기", pickRate: 7.8 }
                ]
            },
            gold: {
                "S+": [
                    { name: "초강력 로켓", pickRate: 20.5 },
                    { name: "폭발 도가니", pickRate: 17.3 },
                    { name: "신나서!", pickRate: 14.8 },
                    { name: "화염 방사기", pickRate: 12.0 }
                ],
                "S": [
                    { name: "번개 총", pickRate: 9.8 },
                    { name: "불꽃 튀는 날뛰기", pickRate: 8.3 }
                ]
            },
            prismatic: {
                "S+": [
                    { name: "초강력 로켓", pickRate: 22.0 },
                    { name: "폭발 도가니", pickRate: 18.7 },
                    { name: "신나서!", pickRate: 16.0 },
                    { name: "화염 방사기", pickRate: 13.2 }
                ],
                "S": [
                    { name: "번개 총", pickRate: 10.5 },
                    { name: "불꽃 튀는 날뛰기", pickRate: 9.0 }
                ]
            }
        }
    }
};

// 나머지 챔피언들을 CHAMPION_TIERS에서 동적으로 추가
if (typeof CHAMPION_TIERS !== 'undefined') {
    Object.keys(CHAMPION_TIERS).forEach(champion => {
        if (!AUGMENT_DATA.champions[champion]) {
            AUGMENT_DATA.champions[champion] = createDefaultAugments(CHAMPION_TIERS[champion]);
        } else {
            // 기존 챔피언의 티어 정보 업데이트
            AUGMENT_DATA.champions[champion].tier = CHAMPION_TIERS[champion];
        }
    });
}
