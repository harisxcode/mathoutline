import { LessonContent, Flashcard, JeopardyQuestion, RagsToRichesQuestion, EscapeRoomChamber } from '../types/curriculum';

export const CURRICULUM_TITLE = "C2M2T1: Adding & Subtracting Rational Numbers";
export const CORE_STANDARD = "I CAN add and subtract rational numbers.";

export const LESSONS_DATA: LessonContent[] = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: "Using Models to Understand Integer Addition",
    subtitle: "Representations, Opposites & Visual Counter Models",
    learningGoals: [
      "Understand what an integer is and distinguish between positive integers, negative integers, and zero.",
      "Represent real-world situations (temperature, elevation, bank accounts) using positive and negative signs.",
      "Identify opposite integers (additive inverses) as numbers that are the same distance from zero in opposite directions.",
      "Model integer addition using two-color counters (yellow = +1, red = -1) and number line vectors."
    ],
    privateEyeFocus: "Be sure to READ the Learning Goals! Pay close attention to how opposites always cancel each other out on a number line or with two-color counters.",
    keyVocabulary: [
      {
        term: "Integer",
        definition: "The set of whole numbers, their opposites, and zero: {..., -3, -2, -1, 0, 1, 2, 3, ...}.",
        example: "-15, 0, and 42 are integers; 3.14 and 1/2 are NOT integers."
      },
      {
        term: "Opposite Numbers (Additive Inverses)",
        definition: "Two numbers that are the exact same distance from zero on a number line, but in opposite directions. Their sum is always 0.",
        example: "The opposite of 7 is -7, because 7 + (-7) = 0."
      },
      {
        term: "Two-Color Counter",
        definition: "A manipulative where one side represents +1 (typically yellow) and the other represents -1 (typically red).",
        example: "3 yellow counters (+3) combined with 2 red counters (-2) leaves 1 yellow counter (+1)."
      }
    ],
    readingSections: [
      {
        title: "1. What is an Integer?",
        content: `In elementary school, you worked with whole numbers: 0, 1, 2, 3, and so on. But real-world situations often require numbers less than zero! 
For instance, if the temperature drops below zero to -8°F, or a submarine dives 250 feet below sea level (-250 ft), or you withdraw $20 from an empty bank account (-$20), negative numbers are essential.
The set of integers includes all positive whole numbers, their negative opposites, and zero. Zero is neither positive nor negative!`,
        visualExplanation: {
          type: 'table',
          title: "Real World Integer Sign Guide",
          description: "Notice how directional words dictate the integer sign:",
          data: [
            { context: "Elevation", positive: "1,200 ft above sea level (+1200)", negative: "85 ft below sea level (-85)" },
            { context: "Money", positive: "Deposit of $50 (+50)", negative: "Withdrawal or debt of $30 (-30)" },
            { context: "Temperature", positive: "14° warmer (+14)", negative: "6° below zero (-6)" },
            { context: "Football", positive: "Gain of 8 yards (+8)", negative: "Loss of 5 yards (-5)" }
          ]
        },
        checkQuestion: {
          question: "A scuba diver is 45 feet below sea level. Which integer represents their position?",
          options: ["+45", "-45", "0", "4.5"],
          correctIndex: 1,
          explanation: "Below sea level represents a negative direction from 0 (sea level), so the integer is -45."
        }
      },
      {
        title: "2. Opposites on the Number Line",
        content: `Every non-zero integer has an opposite. The opposite of a positive integer is a negative integer, and the opposite of a negative integer is a positive integer.
On a horizontal number line:
- Positive numbers lie to the right of zero.
- Negative numbers lie to the left of zero.
Because opposites are equidistant from 0, when you add a number and its opposite, you land right back at 0! For example: 5 + (-5) = 0.`,
        visualExplanation: {
          type: 'number-line',
          title: "Number Line Symmetry",
          description: "-4 and +4 are both exactly 4 units away from 0.",
          data: { left: -4, center: 0, right: 4 }
        },
        checkQuestion: {
          question: "What is the opposite of -19?",
          options: ["-19", "0", "+19", "1/19"],
          correctIndex: 2,
          explanation: "The opposite of negative 19 is positive 19. Both are 19 units from zero."
        }
      },
      {
        title: "3. Modeling Integer Addition with Counters",
        content: `When modeling with two-color counters:
- A yellow counter represents +1.
- A red counter represents -1.
When you combine one yellow counter (+1) and one red counter (-1), they cancel each other out to equal 0. We call this a ZERO PAIR!
To solve 4 + (-2):
1. Place 4 yellow counters: [+][+][+][+]
2. Place 2 red counters: [-][-]
3. Match them into 2 zero pairs: ([+],[-]) and ([+],[-]) which equal 0.
4. Count what remains: 2 yellow counters = +2!`,
        checkQuestion: {
          question: "If you have 5 red counters (-5) and 3 yellow counters (+3), what is the final sum?",
          options: ["+2", "-2", "-8", "+8"],
          correctIndex: 1,
          explanation: "3 yellow counters and 3 red counters form 3 zero pairs (0), leaving 2 red counters, which equals -2."
        }
      }
    ],
    practiceQuestions: [
      {
        id: 'l1-p1',
        question: "Write an integer for the situation: 'A hot air balloon descends 320 feet.'",
        type: 'multiple-choice',
        options: ["+320", "-320", "0", "32"],
        answer: "-320",
        hint: "Descends means moving downward (negative).",
        explanation: "Descending represents downward motion below the starting point, so it is -320."
      },
      {
        id: 'l1-p2',
        question: "Evaluate using a counter model: (-6) + 4",
        type: 'multiple-choice',
        options: ["-2", "+2", "-10", "+10"],
        answer: "-2",
        hint: "Pair up 4 negative counters with 4 positive counters. How many negatives are left over?",
        explanation: "4 pairs cancel to 0, leaving 2 red (negative) counters: -2."
      },
      {
        id: 'l1-p3',
        question: "What is the sum of any integer and its opposite?",
        type: 'multiple-choice',
        options: ["1", "-1", "0", "Twice the number"],
        answer: "0",
        hint: "Think about +7 and -7. Where do you land on a number line?",
        explanation: "By the Additive Inverse Property, a + (-a) = 0 for any integer a."
      }
    ],
    answerKeyHighlights: [
      "Pg. 183 Review: Whole numbers start at 0; integers extend infinitely in both directions.",
      "Pg. 184 Getting Started: Dice roll sums with signed values yield positive, negative, or neutral 0 totals.",
      "Pg. 185 Activity 1: Opposites are mirror images across 0 on the number line.",
      "Pg. 191 Practice #1-2: Always identify whether the sign is positive or negative before computing the magnitude."
    ]
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: "Adding Integers: Part I",
    subtitle: "Absolute Value & Rules for Adding Signed Numbers",
    learningGoals: [
      "Define absolute value as the distance a number is from zero on a number line, denoted as |x|.",
      "Recognize that distance and absolute value are NEVER negative: |-7| = 7 and |7| = 7.",
      "Discover the rule for adding integers with the SAME sign: Add their absolute values and keep the shared sign.",
      "Discover the rule for adding integers with DIFFERENT signs: Find the difference between their absolute values and keep the sign of the integer with the greater absolute value."
    ],
    privateEyeFocus: "Private Eye Alert: Never confuse the sign of a number with its absolute value! Absolute value measures distance from 0, so distance is always positive or zero.",
    keyVocabulary: [
      {
        term: "Absolute Value |x|",
        definition: "The distance between a number x and 0 on a number line. It is always non-negative (positive or zero).",
        example: "|-14| = 14 and |14| = 14."
      },
      {
        term: "Same Sign Addition Rule",
        definition: "When adding two integers with the same sign, add their absolute values and attach the common sign.",
        example: "(-5) + (-8) = -(5 + 8) = -13."
      },
      {
        term: "Different Sign Addition Rule",
        definition: "When adding two integers with different signs, subtract the smaller absolute value from the larger absolute value, then keep the sign of the number with the larger absolute value.",
        example: "(-12) + 7: | -12 | = 12, | 7 | = 7. 12 - 7 = 5. Since |-12| is larger, the result is -5."
      }
    ],
    readingSections: [
      {
        title: "1. What is Absolute Value?",
        content: `If you walk 5 blocks East or 5 blocks West, how far did you walk in total? In both cases, you walked 5 blocks! Distance cannot be negative.
In mathematics, absolute value represents distance from 0 on a number line. We write absolute value with vertical bars: |x|.
- |-9| = 9 (because -9 is 9 units away from 0)
- |+9| = 9 (because +9 is also 9 units away from 0)
- |0| = 0 (0 is 0 units away from itself)`,
        checkQuestion: {
          question: "Evaluate: |-23| + |15|",
          options: ["-8", "8", "38", "-38"],
          correctIndex: 2,
          explanation: "|-23| = 23 and |15| = 15. Then 23 + 15 = 38."
        }
      },
      {
        title: "2. Adding Integers with the Same Sign",
        content: `When two integers share the SAME sign, their arrows on the number line point in the exact same direction!
- Positive + Positive = POSITIVE:
  Example: 6 + 9 = 15.
- Negative + Negative = NEGATIVE:
  Example: (-7) + (-4). You start at 0, move 7 units left, then move 4 MORE units left. You land at -11!
Rule: Add their absolute values (| -7 | + | -4 | = 11) and keep the negative sign: -11.`,
        checkQuestion: {
          question: "Compute: (-18) + (-24)",
          options: ["-6", "+42", "-42", "+6"],
          correctIndex: 2,
          explanation: "Both signs are negative. 18 + 24 = 42. Keep the negative sign: -42."
        }
      },
      {
        title: "3. Adding Integers with Different Signs",
        content: `When integers have DIFFERENT signs, they pull in opposite directions on the number line!
Think of a tug-of-war between the positive team and the negative team:
- Who has the stronger team (greater absolute value)?
- By how much do they win?
Example: (-15) + 9
1. Absolute values: |-15| = 15, |9| = 9.
2. The negative team is stronger because 15 > 9.
3. Difference: 15 - 9 = 6.
4. Since the negative team was larger, the answer is -6!`,
        checkQuestion: {
          question: "Solve: 25 + (-32)",
          options: ["-7", "+7", "-57", "+57"],
          correctIndex: 0,
          explanation: "|-32| = 32 and |25| = 25. 32 - 25 = 7. Since -32 has the greater absolute value, the sum is -7."
        }
      }
    ],
    practiceQuestions: [
      {
        id: 'l2-p1',
        question: "Calculate: (-13) + (-17)",
        type: 'multiple-choice',
        options: ["-30", "+30", "-4", "+4"],
        answer: "-30",
        hint: "Same signs! Add their absolute values and keep the negative sign.",
        explanation: "13 + 17 = 30. Both are negative, so the answer is -30."
      },
      {
        id: 'l2-p2',
        question: "Calculate: (-45) + 60",
        type: 'multiple-choice',
        options: ["-15", "+15", "-105", "+105"],
        answer: "+15",
        hint: "Different signs! Subtract 45 from 60. Which number has the larger absolute value?",
        explanation: "60 - 45 = 15. The positive number has greater absolute value, so the answer is +15."
      },
      {
        id: 'l2-p3',
        question: "Which expression has the greatest value?",
        type: 'multiple-choice',
        options: ["|-12|", "-|-15|", "|-8| + |-2|", "(-10) + 12"],
        answer: "|-12|",
        hint: "Evaluate each one: |-12| = 12; -|-15| = -15; |-8| + |-2| = 10; (-10)+12 = 2.",
        explanation: "|-12| = 12, which is larger than -15, 10, and 2."
      }
    ],
    answerKeyHighlights: [
      "Pg. 193 Review: Absolute value is always positive or zero.",
      "Pg. 196 Activity 1: Adding numbers with like signs extends in the same direction.",
      "Pg. 199 Activity 2: When signs differ, the answer always takes the sign of the larger absolute value.",
      "Pg. 201 Talk the Talk: In your own words, summarize why (-a) + (-b) is always negative."
    ]
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: "Adding Integers: Part II",
    subtitle: "Multi-Term Expressions & Real-World Word Problems",
    learningGoals: [
      "Add three or more integers efficiently using the Commutative and Associative Properties of Addition.",
      "Strategically group opposites and compatible numbers that sum to zero first.",
      "Translate complex real-world situations (financial bank ledgers, temperature swings, sports yardage) into integer equations.",
      "Verify solutions using mental math estimation and number line models."
    ],
    privateEyeFocus: "Scan expressions for OPPOSITES first! If you see -17 and +17, combine them to get 0 immediately—it saves huge time and prevents errors.",
    keyVocabulary: [
      {
        term: "Commutative Property of Addition",
        definition: "You can change the order of addends without changing the sum: a + b = b + a.",
        example: "(-8) + 15 = 15 + (-8) = 7."
      },
      {
        term: "Associative Property of Addition",
        definition: "You can group addends in different ways without changing the sum: (a + b) + c = a + (b + c).",
        example: "[(-4) + 4] + (-9) = 0 + (-9) = -9."
      },
      {
        term: "Compatible Numbers Strategy",
        definition: "Grouping numbers that add together easily to make zero or multiples of 10.",
        example: "In (-24) + 17 + 24, group (-24 + 24) = 0, leaving 0 + 17 = 17."
      }
    ],
    readingSections: [
      {
        title: "1. The Power of Grouping Opposites",
        content: `When you have a long string of integers to add, DO NOT just blindly go from left to right!
Take advantage of the Commutative and Associative Properties to rearrange the terms:
Look at: (-38) + 14 + 38 + (-9)
Notice that (-38) and 38 are opposites!
1. Rearrange: [(-38) + 38] + 14 + (-9)
2. Simplify the opposites: 0 + 14 + (-9)
3. Now solve: 14 + (-9) = 5!
Spotting zero pairs in multi-term expressions makes algebra lightning fast!`,
        checkQuestion: {
          question: "Simplify: (-82) + 45 + 82 + (-15)",
          options: ["30", "-30", "130", "0"],
          correctIndex: 0,
          explanation: "(-82 + 82) = 0. Then 0 + 45 + (-15) = 45 - 15 = 30."
        }
      },
      {
        title: "2. Real-World Multi-Step Scenarios",
        content: `Let's look at real applications:
- **Banking Ledger**: Starting balance: $120. Transactions: -$45 (groceries), +$200 (paycheck), -$80 (phone bill).
  Equation: 120 + (-45) + 200 + (-80)
  Group positives: 120 + 200 = 320
  Group negatives: (-45) + (-80) = -125
  Combine: 320 + (-125) = $195.
- **Football Yardage**: Play 1: +8 yds, Play 2: -12 yds, Play 3: +15 yds.
  Total: 8 + (-12) + 15 = -4 + 15 = +11 yards net gain!`,
        checkQuestion: {
          question: "At sunrise it was -6°F. By noon it rose 14°F, and by sunset it dropped 9°F. What was the sunset temperature?",
          options: ["-1°F", "1°F", "-11°F", "17°F"],
          correctIndex: 0,
          explanation: "(-6) + 14 + (-9) = 8 + (-9) = -1°F."
        }
      }
    ],
    practiceQuestions: [
      {
        id: 'l3-p1',
        question: "Evaluate: (-14) + 29 + (-16) + 14",
        type: 'multiple-choice',
        options: ["13", "-13", "43", "0"],
        answer: "13",
        hint: "Find the opposites (-14 and 14) first!",
        explanation: "(-14 + 14) cancels to 0. Then 29 + (-16) = 13."
      },
      {
        id: 'l3-p2',
        question: "A submarine at -350 feet ascends 120 feet, then descends 70 feet. What is its current depth?",
        type: 'multiple-choice',
        options: ["-300 ft", "-160 ft", "-540 ft", "-400 ft"],
        answer: "-300 ft",
        hint: "Ascending is positive (+120), descending is negative (-70).",
        explanation: "(-350) + 120 + (-70) = -230 + (-70) = -300 feet."
      },
      {
        id: 'l3-p3',
        question: "Compute: (-5) + (-12) + (-8) + 25",
        type: 'multiple-choice',
        options: ["0", "+5", "-5", "+10"],
        answer: "0",
        hint: "Add all negative numbers together first.",
        explanation: "(-5) + (-12) + (-8) = -25. Then -25 + 25 = 0!"
      }
    ],
    answerKeyHighlights: [
      "Pg. 207 Activity 1: Grouping like signs first often simplifies multi-term addition.",
      "Pg. 208-212 Activity 2: When translating word problems, assign positive to gains/rises and negative to drops/debts.",
      "Pg. 219 Practice: Always verify by calculating with a secondary grouping method."
    ]
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: "Subtracting Integers",
    subtitle: "Zero Pairs & Adding the Opposite (Keep, Change, Change)",
    learningGoals: [
      "Explain what a ZERO PAIR is and how adding or removing zero pairs does not change the net value.",
      "Model subtraction using two-color counters when there are not enough counters to simply take away.",
      "Understand the key algebraic equivalence: Subtracting an integer is the same as adding its opposite (a - b = a + (-b)).",
      "Apply the 'Keep, Change, Change' strategy with precision to any signed subtraction problem."
    ],
    privateEyeFocus: "Can you explain what a ZERO PAIR is to a classmate??? A zero pair is (+1) + (-1) = 0. Because it equals zero, you can add 1, 2, or 100 zero pairs to your board without changing the total value at all!",
    keyVocabulary: [
      {
        term: "Zero Pair",
        definition: "A pair of counters (one positive +1 and one negative -1) whose sum is 0. Adding zero pairs introduces counters you need without altering the net value.",
        example: "(+1) + (-1) = 0."
      },
      {
        term: "Subtraction as Adding the Opposite",
        definition: "For any real numbers a and b: a - b = a + (-b).",
        example: "5 - 8 = 5 + (-8) = -3."
      },
      {
        term: "Keep, Change, Change (KCC)",
        definition: "Memory rule for subtracting integers: KEEP the 1st number, CHANGE subtraction to addition, CHANGE the 2nd number to its opposite.",
        example: "(-6) - (-10) becomes (-6) + (+10) = +4."
      }
    ],
    readingSections: [
      {
        title: "1. The Mystery of Taking Away What Isn't There",
        content: `Suppose you have 3 positive counters [+][+][+] and you want to subtract 5 positive counters: 3 - 5.
How can you take away 5 positives when you only have 3?
Here is where the magic of the **ZERO PAIR** comes in!
Since (+1) + (-1) = 0, adding a zero pair to your counters adds exactly ZERO to your value.
1. Start with 3 positives: [+][+][+] (Net value = +3)
2. Add TWO zero pairs: [+][+][+] and ([+],[-]) and ([+],[-]) (Net value is still +3!)
3. Now you have 5 positives and 2 negatives.
4. Take away the 5 positives!
5. What is left? Exactly 2 negatives: -2!
So 3 - 5 = -2.`,
        checkQuestion: {
          question: "Why are you allowed to add zero pairs to a counter model without changing the expression's value?",
          options: [
            "Because zero pairs multiply the number by 1",
            "Because each zero pair has a net value of 0, so adding 0 changes nothing",
            "Because negative counters are invisible",
            "Because subtraction cancels all numbers"
          ],
          correctIndex: 1,
          explanation: "Since (+1) + (-1) = 0, adding zero pairs is equivalent to adding 0."
        }
      },
      {
        title: "2. The Algorithm: Subtracting is Adding the Opposite",
        content: `Once you understand zero pairs, you can use the algebraic shortcut:
**a - b = a + (-b)**
Often called **Keep, Change, Change (KCC)**:
1. **KEEP** the first number exactly as it is.
2. **CHANGE** the subtraction sign (-) to an addition sign (+).
3. **CHANGE** the second number to its opposite!

Let's test all 4 combinations:
- 7 - 12  → Keep 7, Change - to +, Change 12 to -12  → 7 + (-12) = -5
- (-8) - 5 → Keep -8, Change - to +, Change 5 to -5 → (-8) + (-5) = -13
- 4 - (-6) → Keep 4, Change - to +, Change -6 to +6 → 4 + (+6) = 10
- (-9) - (-15) → Keep -9, Change - to +, Change -15 to +15 → (-9) + 15 = 6`,
        checkQuestion: {
          question: "Rewrite (-14) - (-9) using the 'adding the opposite' rule:",
          options: ["(-14) + (-9)", "(-14) + 9", "14 + 9", "14 + (-9)"],
          correctIndex: 1,
          explanation: "Keep -14, change - to +, and change -9 to +9: (-14) + 9 = -5."
        }
      }
    ],
    practiceQuestions: [
      {
        id: 'l4-p1',
        question: "Evaluate: (-7) - 15",
        type: 'multiple-choice',
        options: ["-22", "+8", "-8", "+22"],
        answer: "-22",
        hint: "Keep -7, Change to +, Change 15 to -15. Then add: (-7) + (-15).",
        explanation: "(-7) - 15 = (-7) + (-15) = -22."
      },
      {
        id: 'l4-p2',
        question: "Evaluate: 12 - (-18)",
        type: 'multiple-choice',
        options: ["-6", "+6", "+30", "-30"],
        answer: "+30",
        hint: "Subtracting a negative is the same as adding a positive!",
        explanation: "12 - (-18) = 12 + (+18) = 30."
      },
      {
        id: 'l4-p3',
        question: "The highest elevation in California is Mt. Whitney at 14,505 feet. The lowest is Badwater Basin at -282 feet. What is the difference in elevation?",
        type: 'multiple-choice',
        options: ["14,223 feet", "14,787 feet", "-14,787 feet", "14,505 feet"],
        answer: "14,787 feet",
        hint: "Difference means subtract: 14505 - (-282).",
        explanation: "14,505 - (-282) = 14,505 + 282 = 14,787 feet."
      }
    ],
    answerKeyHighlights: [
      "Pg. 221 Review: Subtraction is the inverse operation of addition.",
      "Pg. 227 Activity 2: When you don't have enough counters to subtract, introduce zero pairs until you do.",
      "Pg. 234 Activity 4: Subtracting a negative always moves RIGHT on the number line.",
      "Pg. 239 Practice: Watch double negatives: - (-x) becomes + x."
    ]
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: "Adding/Subtracting Rational Numbers",
    subtitle: "Extending Signed Operations to Decimals & Fractions",
    learningGoals: [
      "Define rational numbers as any number that can be expressed as a quotient of two integers (a/b where b ≠ 0).",
      "Apply integer sign rules to decimal addition and subtraction with proper place-value alignment.",
      "Apply integer sign rules to positive and negative fractions and mixed numbers using common denominators.",
      "Solve multi-step real-world problems involving rational numbers (stock prices, recipe adjustments, measurements)."
    ],
    privateEyeFocus: "Private Eye Reminder: All the integer rules you mastered in Lessons 1-4 apply identically to decimals and fractions! Keep your signs clear and line up decimals or common denominators.",
    keyVocabulary: [
      {
        term: "Rational Number",
        definition: "Any number that can be written as a ratio of two integers a/b, where b is not zero. Includes terminating decimals (0.75), repeating decimals (0.333...), fractions (-2/3), and integers.",
        example: "-4.5 = -9/2; 0.6 = 3/5; 7 = 7/1."
      },
      {
        term: "Signed Decimals Alignment",
        definition: "Align decimal points vertically, determine the sign of the result using integer rules, and add or subtract place values accordingly.",
        example: "-6.2 + 2.7: since |-6.2| > |2.7|, compute 6.2 - 2.7 = 3.5, result is -3.5."
      },
      {
        term: "Signed Fractions with Common Denominators",
        definition: "Find the least common denominator (LCD), convert numerators, and apply integer addition/subtraction to the numerators while keeping the denominator.",
        example: "(-3/4) - (1/2) = (-3/4) - (2/4) = (-3 - 2)/4 = -5/4 = -1 1/4."
      }
    ],
    readingSections: [
      {
        title: "1. What Makes a Number 'Rational'?",
        content: `The word 'rational' comes from the word RATIO.
A rational number is any number that can be written as a fraction $\\frac{a}{b}$ where $a$ and $b$ are integers, and $b \\neq 0$.
Examples:
- $\\frac{3}{5}$ is rational.
- $-4 = -\\frac{4}{1}$ is rational.
- $0.35 = \\frac{35}{100} = \\frac{7}{20}$ is rational.
- $-2 \\frac{1}{3} = -\\frac{7}{3}$ is rational.
The best part? You DO NOT need to learn any new sign rules! The exact same rules for integers apply to all rational numbers!`,
        checkQuestion: {
          question: "Which of the following is a rational number?",
          options: ["-0.875", "3/4", "-5", "All of the above"],
          correctIndex: 3,
          explanation: "All integers, fractions, and terminating decimals are rational numbers."
        }
      },
      {
        title: "2. Adding and Subtracting Signed Decimals",
        content: `Follow these two foolproof steps:
1. **Determine the Sign First** using the integer rules:
   - Same signs? Add the magnitudes, keep the sign.
   - Different signs? Subtract the smaller magnitude from the larger magnitude, take the sign of the larger magnitude.
2. **Line Up the Decimal Points** and calculate!

Example: $(-4.8) + 1.35$
- Signs are different.
- Larger magnitude: $|-4.8| = 4.80$. Smaller: $|1.35| = 1.35$.
- Subtract: $4.80 - 1.35 = 3.45$.
- Since -4.8 has the larger absolute value, the answer is **-3.45**!`,
        checkQuestion: {
          question: "Compute: (-2.6) - (-5.9)",
          options: ["-8.5", "+3.3", "-3.3", "+8.5"],
          correctIndex: 1,
          explanation: "Use KCC: (-2.6) + (+5.9) = 5.9 - 2.6 = +3.3."
        }
      },
      {
        title: "3. Adding and Subtracting Signed Fractions",
        content: `When dealing with signed fractions:
1. Rewrite any subtractions as adding the opposite: $\\frac{a}{b} - \\frac{c}{d} = \\frac{a}{b} + \\left(-\\frac{c}{d}\\right)$.
2. Convert all fractions to a common denominator (LCD).
3. Combine the numerators using integer addition rules.
4. Keep the common denominator and simplify if possible.

Example: $-\\frac{2}{3} + \\left(-\\frac{1}{4}\\right)$
- Common denominator is 12: $-\\frac{8}{12} + \\left(-\\frac{3}{12}\\right)$.
- Numerators: $(-8) + (-3) = -11$.
- Result: $-\\frac{11}{12}$.`,
        checkQuestion: {
          question: "Solve: -1/2 - 1/4",
          options: ["-1/4", "-3/4", "+1/4", "+3/4"],
          correctIndex: 1,
          explanation: "-1/2 - 1/4 = -2/4 + (-1/4) = -3/4."
        }
      }
    ],
    practiceQuestions: [
      {
        id: 'l5-p1',
        question: "Evaluate: (-3.75) + (-2.5)",
        type: 'multiple-choice',
        options: ["-6.25", "-1.25", "+6.25", "+1.25"],
        answer: "-6.25",
        hint: "Both numbers are negative. Line up the decimals and add: 3.75 + 2.50 = 6.25. Keep the negative sign.",
        explanation: "(-3.75) + (-2.50) = -6.25."
      },
      {
        id: 'l5-p2',
        question: "Evaluate: (-5/6) - (-1/3)",
        type: 'multiple-choice',
        options: ["-1/2", "-7/6", "+1/2", "-2/3"],
        answer: "-1/2",
        hint: "KCC: (-5/6) + (1/3). Convert 1/3 to 2/6: (-5/6) + (2/6) = -3/6.",
        explanation: "(-5/6) + (2/6) = -3/6 = -1/2."
      },
      {
        id: 'l5-p3',
        question: "A stock fell $1.80 on Monday and gained $2.45 on Tuesday. What was the net change over the two days?",
        type: 'multiple-choice',
        options: ["+$0.65", "-$0.65", "+$4.25", "-$4.25"],
        answer: "+$0.65",
        hint: "(-1.80) + 2.45 = 2.45 - 1.80.",
        explanation: "2.45 - 1.80 = +0.65, so a net gain of $0.65."
      }
    ],
    answerKeyHighlights: [
      "Gap Fillers: Add/Subtract Decimals & Fractions WS requires lining up decimals and finding LCDs.",
      "Pg. 241 Review: Converting mixed numbers to improper fractions often prevents borrow errors.",
      "Pg. 247 Activity 2: Always simplify fractions to lowest terms.",
      "Topic Review: Test yourself against the Knowledge Rating Scale: I CAN add and subtract rational numbers!"
    ]
  }
];

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    lessonId: 'lesson-1',
    lessonName: 'Lesson 1: Intro to Integers',
    frontTitle: 'Vocabulary Term',
    frontPrompt: 'What is an Integer?',
    frontType: 'definition',
    backAnswer: 'Whole numbers, their opposites, and zero: {..., -3, -2, -1, 0, 1, 2, 3, ...}.',
    backExplanation: 'Fractions like 1/2 and decimals like 3.14 are NOT integers.',
    difficulty: 'easy'
  },
  {
    id: 'fc-2',
    lessonId: 'lesson-1',
    lessonName: 'Lesson 1: Opposites',
    frontTitle: 'Opposite Integers',
    frontPrompt: 'What is the opposite of -14, and what is their sum?',
    frontType: 'calculation',
    backAnswer: 'Opposite is +14. Their sum is 0: (-14) + 14 = 0.',
    backExplanation: 'Opposites are equidistant from 0 in opposite directions on a number line.',
    difficulty: 'easy'
  },
  {
    id: 'fc-3',
    lessonId: 'lesson-1',
    lessonName: 'Lesson 1: Real-World Signs',
    frontTitle: 'Real-World Representation',
    frontPrompt: 'Write an integer for: "A submarine dives 420 feet below sea level."',
    frontType: 'rule',
    backAnswer: '-420',
    backExplanation: 'Sea level is 0. Moving below sea level represents a negative integer.',
    difficulty: 'easy'
  },
  {
    id: 'fc-4',
    lessonId: 'lesson-1',
    lessonName: 'Lesson 1: Counter Model',
    frontTitle: 'Two-Color Counters',
    frontPrompt: 'What does 1 yellow counter and 1 red counter equal when combined?',
    frontType: 'visual',
    backAnswer: '0 (A Zero Pair)',
    backExplanation: 'Yellow represents +1 and red represents -1. (+1) + (-1) = 0.',
    difficulty: 'easy'
  },
  {
    id: 'fc-5',
    lessonId: 'lesson-2',
    lessonName: 'Lesson 2: Absolute Value',
    frontTitle: 'Absolute Value Definition',
    frontPrompt: 'What does |x| represent, and can it ever be negative?',
    frontType: 'definition',
    backAnswer: 'Distance from zero on a number line. It can NEVER be negative!',
    backExplanation: 'Distance is always non-negative. |-9| = 9, |9| = 9, |0| = 0.',
    difficulty: 'easy'
  },
  {
    id: 'fc-6',
    lessonId: 'lesson-2',
    lessonName: 'Lesson 2: Adding Like Signs',
    frontTitle: 'Rule: Same Signs',
    frontPrompt: 'What is the rule for adding two negative integers, e.g., (-7) + (-8)?',
    frontType: 'rule',
    backAnswer: 'Add their absolute values and keep the negative sign! (7 + 8 = 15 -> -15)',
    backExplanation: 'Moving left and left again keeps moving further into the negatives.',
    difficulty: 'easy'
  },
  {
    id: 'fc-7',
    lessonId: 'lesson-2',
    lessonName: 'Lesson 2: Adding Unlike Signs',
    frontTitle: 'Rule: Different Signs',
    frontPrompt: 'How do you add integers with DIFFERENT signs, e.g., (-15) + 9?',
    frontType: 'rule',
    backAnswer: 'Subtract the smaller absolute value from the larger, then keep the sign of the larger: -6.',
    backExplanation: '15 - 9 = 6. Since |-15| is larger than |9|, the answer takes the negative sign.',
    difficulty: 'medium'
  },
  {
    id: 'fc-8',
    lessonId: 'lesson-2',
    lessonName: 'Lesson 2: Absolute Value Math',
    frontTitle: 'Evaluate Expression',
    frontPrompt: 'Evaluate: |-16| - |4|',
    frontType: 'calculation',
    backAnswer: '12',
    backExplanation: '|-16| = 16 and |4| = 4. 16 - 4 = 12.',
    difficulty: 'medium'
  },
  {
    id: 'fc-9',
    lessonId: 'lesson-3',
    lessonName: 'Lesson 3: Multi-Term Addition',
    frontTitle: 'Strategy Tip',
    frontPrompt: 'What should you look for first in: (-25) + 18 + 25 + (-7)?',
    frontType: 'rule',
    backAnswer: 'Look for opposites! (-25 and 25). Combine them to get 0 immediately.',
    backExplanation: '0 + 18 + (-7) = 11. Spotting zero pairs saves calculation time.',
    difficulty: 'medium'
  },
  {
    id: 'fc-10',
    lessonId: 'lesson-3',
    lessonName: 'Lesson 3: Properties',
    frontTitle: 'Commutative Property',
    frontPrompt: 'Why does (-9) + 4 = 4 + (-9)?',
    frontType: 'rule',
    backAnswer: 'Commutative Property of Addition: changing the order does not change the sum.',
    backExplanation: 'Both expressions equal -5.',
    difficulty: 'easy'
  },
  {
    id: 'fc-11',
    lessonId: 'lesson-4',
    lessonName: 'Lesson 4: Subtracting Integers',
    frontTitle: 'Core Identity',
    frontPrompt: 'How can any subtraction problem a - b be rewritten as addition?',
    frontType: 'rule',
    backAnswer: 'a - b = a + (-b) (Subtracting is adding the opposite!)',
    backExplanation: 'Keep the first number, change subtraction to addition, change the second number to its opposite.',
    difficulty: 'medium'
  },
  {
    id: 'fc-12',
    lessonId: 'lesson-4',
    lessonName: 'Lesson 4: Zero Pairs',
    frontTitle: 'Explain Zero Pair',
    frontPrompt: 'Can you explain to a classmate what a ZERO PAIR is?',
    frontType: 'definition',
    backAnswer: 'A pair composed of one (+1) and one (-1). Because they cancel to 0, adding zero pairs changes nothing.',
    backExplanation: 'Used in counter models to introduce counters you need to subtract.',
    difficulty: 'medium'
  },
  {
    id: 'fc-13',
    lessonId: 'lesson-4',
    lessonName: 'Lesson 4: Double Negative',
    frontTitle: 'Calculation',
    frontPrompt: 'Solve: 8 - (-12)',
    frontType: 'calculation',
    backAnswer: '20',
    backExplanation: 'Keep 8, Change to +, Change -12 to +12: 8 + 12 = 20.',
    difficulty: 'medium'
  },
  {
    id: 'fc-14',
    lessonId: 'lesson-4',
    lessonName: 'Lesson 4: Negative Minus Negative',
    frontTitle: 'Calculation',
    frontPrompt: 'Solve: (-10) - (-4)',
    frontType: 'calculation',
    backAnswer: '-6',
    backExplanation: 'Keep -10, change to +, change -4 to +4: (-10) + 4 = -6.',
    difficulty: 'medium'
  },
  {
    id: 'fc-15',
    lessonId: 'lesson-5',
    lessonName: 'Lesson 5: Rational Numbers',
    frontTitle: 'Rational Definition',
    frontPrompt: 'What is a rational number?',
    frontType: 'definition',
    backAnswer: 'Any number that can be expressed as a/b where a and b are integers and b ≠ 0.',
    backExplanation: 'Includes fractions, mixed numbers, terminating decimals, and repeating decimals.',
    difficulty: 'medium'
  },
  {
    id: 'fc-16',
    lessonId: 'lesson-5',
    lessonName: 'Lesson 5: Signed Decimals',
    frontTitle: 'Calculation',
    frontPrompt: 'Solve: (-4.5) + 2.1',
    frontType: 'calculation',
    backAnswer: '-2.4',
    backExplanation: 'Different signs: subtract 4.5 - 2.1 = 2.4. Since |-4.5| is larger, result is -2.4.',
    difficulty: 'medium'
  },
  {
    id: 'fc-17',
    lessonId: 'lesson-5',
    lessonName: 'Lesson 5: Signed Fractions',
    frontTitle: 'Calculation',
    frontPrompt: 'Solve: (-2/5) + (-1/5)',
    frontType: 'calculation',
    backAnswer: '-3/5',
    backExplanation: 'Same denominator. Add numerators: (-2) + (-1) = -3. Keep denominator: -3/5.',
    difficulty: 'medium'
  },
  {
    id: 'fc-18',
    lessonId: 'lesson-5',
    lessonName: 'Lesson 5: Fraction Subtraction',
    frontTitle: 'Calculation',
    frontPrompt: 'Solve: 1/3 - 5/6',
    frontType: 'calculation',
    backAnswer: '-1/2',
    backExplanation: 'Convert 1/3 to 2/6: 2/6 - 5/6 = 2/6 + (-5/6) = -3/6 = -1/2.',
    difficulty: 'hard'
  }
];

export const JEOPARDY_QUESTIONS: JeopardyQuestion[] = [
  // Category 1: Opposites & Absolute Value
  { id: 'j-1-100', category: 'Opposites & Absolutes', points: 100, question: 'What is the absolute value of -17?', options: ['17', '-17', '0', '1/17'], correctIndex: 0, explanation: 'Distance from zero is always positive: |-17| = 17.' },
  { id: 'j-1-200', category: 'Opposites & Absolutes', points: 200, question: 'What is the sum of any integer and its opposite?', options: ['1', '0', '-1', '2'], correctIndex: 1, explanation: 'By the Additive Inverse Property, a + (-a) = 0.' },
  { id: 'j-1-300', category: 'Opposites & Absolutes', points: 300, question: 'Evaluate: |-25| - |-10|', options: ['-35', '15', '-15', '35'], correctIndex: 1, explanation: '25 - 10 = 15.' },
  { id: 'j-1-400', category: 'Opposites & Absolutes', points: 400, question: 'Which number is further from 0: -34 or +29?', options: ['-34', '+29', 'They are equal', 'Cannot be determined'], correctIndex: 0, explanation: '|-34| = 34, which is greater than |29| = 29.' },
  { id: 'j-1-500', category: 'Opposites & Absolutes', points: 500, question: 'If |x| = 19, what are the possible values of x?', options: ['19 only', '-19 only', '19 and -19', '0 and 19'], correctIndex: 2, explanation: 'Both 19 and -19 are exactly 19 units away from zero.' },

  // Category 2: Zero Pairs & Models
  { id: 'j-2-100', category: 'Zero Pairs & Models', points: 100, question: 'In standard two-color counters, what integer does 1 red counter represent?', options: ['+1', '-1', '0', '+2'], correctIndex: 1, explanation: 'Red counters represent negative integers (-1).' },
  { id: 'j-2-200', category: 'Zero Pairs & Models', points: 200, question: 'What is a "zero pair"?', options: ['Two zeros added together', 'One positive (+1) and one negative (-1) counter', 'Two negative counters', 'Any even number'], correctIndex: 1, explanation: '(+1) + (-1) = 0, so one positive and one negative counter form a zero pair.' },
  { id: 'j-2-300', category: 'Zero Pairs & Models', points: 300, question: 'You have 4 yellow counters (+4) and 7 red counters (-7). How many zero pairs can you form, and what is the net value?', options: ['4 zero pairs, net value -3', '7 zero pairs, net value +3', '3 zero pairs, net value 0', '11 zero pairs, net value -11'], correctIndex: 0, explanation: 'You can pair 4 yellow and 4 red to make 4 zero pairs (0), leaving 3 red (-3).' },
  { id: 'j-2-400', category: 'Zero Pairs & Models', points: 400, question: 'To solve 2 - 5 with counters when you only have 2 yellow counters, what should you do?', options: ['Add 3 yellow counters', 'Add 3 zero pairs', 'Remove the 2 yellow counters', 'Change the problem to 5 - 2'], correctIndex: 1, explanation: 'Adding 3 zero pairs allows you to remove 5 yellow counters, leaving 3 red (-3).' },
  { id: 'j-2-500', category: 'Zero Pairs & Models', points: 500, question: 'On a number line, if you start at -3 and add -4, in which direction do you move and where do you end?', options: ['Right 4 units to +1', 'Left 4 units to -7', 'Right 4 units to -1', 'Left 4 units to +7'], correctIndex: 1, explanation: 'Adding a negative integer moves LEFT on the number line: -3 + (-4) = -7.' },

  // Category 3: Adding Integers
  { id: 'j-3-100', category: 'Adding Integers', points: 100, question: 'Solve: (-12) + (-8)', options: ['-20', '+20', '-4', '+4'], correctIndex: 0, explanation: 'Same sign: add absolute values (12 + 8 = 20) and keep negative: -20.' },
  { id: 'j-3-200', category: 'Adding Integers', points: 200, question: 'Solve: (-15) + 22', options: ['-7', '+7', '-37', '+37'], correctIndex: 1, explanation: 'Different signs: 22 - 15 = 7. Positive has larger magnitude, so +7.' },
  { id: 'j-3-300', category: 'Adding Integers', points: 300, question: 'Solve: 40 + (-65)', options: ['-25', '+25', '-105', '+105'], correctIndex: 0, explanation: '65 - 40 = 25. The negative has larger absolute value: -25.' },
  { id: 'j-3-400', category: 'Adding Integers', points: 400, question: 'Simplify: (-14) + 33 + 14 + (-20)', options: ['13', '-13', '0', '27'], correctIndex: 0, explanation: '(-14 + 14) cancels to 0. Then 33 + (-20) = 13.' },
  { id: 'j-3-500', category: 'Adding Integers', points: 500, question: 'A bank balance is -$45. You deposit $120, then spend $85. What is the final balance?', options: ['-$10', '+$10', '-$20', '+$30'], correctIndex: 0, explanation: '(-45) + 120 = +75; then 75 + (-85) = -$10.' },

  // Category 4: Subtracting Integers
  { id: 'j-4-100', category: 'Subtracting Integers', points: 100, question: 'Rewrite 9 - 14 as an addition expression using "add the opposite":', options: ['9 + 14', '9 + (-14)', '-9 + 14', '-9 + (-14)'], correctIndex: 1, explanation: 'Keep 9, change minus to plus, change 14 to -14: 9 + (-14).' },
  { id: 'j-4-200', category: 'Subtracting Integers', points: 200, question: 'Solve: 6 - (-11)', options: ['-5', '+5', '-17', '+17'], correctIndex: 3, explanation: '6 - (-11) = 6 + 11 = 17.' },
  { id: 'j-4-300', category: 'Subtracting Integers', points: 300, question: 'Solve: (-18) - 12', options: ['-6', '+6', '-30', '+30'], correctIndex: 2, explanation: '(-18) + (-12) = -30.' },
  { id: 'j-4-400', category: 'Subtracting Integers', points: 400, question: 'Solve: (-25) - (-35)', options: ['-60', '-10', '+10', '+60'], correctIndex: 2, explanation: '(-25) + 35 = 10.' },
  { id: 'j-4-500', category: 'Subtracting Integers', points: 500, question: 'The daytime temperature on Mars is -20°C and the nighttime is -100°C. What is the difference (day minus night)?', options: ['-80°C', '+80°C', '-120°C', '+120°C'], correctIndex: 1, explanation: '-20 - (-100) = -20 + 100 = +80°C.' },

  // Category 5: Rational Numbers
  { id: 'j-5-100', category: 'Rational Numbers', points: 100, question: 'Solve: (-3.4) + (-2.1)', options: ['-5.5', '+5.5', '-1.3', '+1.3'], correctIndex: 0, explanation: 'Both negative: 3.4 + 2.1 = 5.5 -> -5.5.' },
  { id: 'j-5-200', category: 'Rational Numbers', points: 200, question: 'Solve: (-5.8) + 9.2', options: ['-3.4', '+3.4', '-15.0', '+15.0'], correctIndex: 1, explanation: '9.2 - 5.8 = 3.4. Positive is larger, so +3.4.' },
  { id: 'j-5-300', category: 'Rational Numbers', points: 300, question: 'Solve: (-3/7) + (-2/7)', options: ['-1/7', '-5/7', '+5/7', '-5/14'], correctIndex: 1, explanation: 'Add numerators: (-3) + (-2) = -5 over 7: -5/7.' },
  { id: 'j-5-400', category: 'Rational Numbers', points: 400, question: 'Solve: (-1/4) - 1/2', options: ['-3/4', '-1/4', '+1/4', '+3/4'], correctIndex: 0, explanation: '(-1/4) + (-2/4) = -3/4.' },
  { id: 'j-5-500', category: 'Rational Numbers', points: 500, question: 'Solve: (-2.5) - (-4.75)', options: ['-7.25', '+2.25', '-2.25', '+7.25'], correctIndex: 1, explanation: '(-2.5) + 4.75 = 4.75 - 2.50 = +2.25.' }
];

export const RAGS_TO_RICHES_QUESTIONS: RagsToRichesQuestion[] = [
  { level: 1, prize: '$100', question: 'What is the opposite of +8?', options: ['-8', '0', '80', '1/8'], correctIndex: 0, hint: 'Opposite integers lie the same distance from 0 in reverse.', explanation: 'The opposite of positive 8 is negative 8.' },
  { level: 2, prize: '$200', question: 'What is the absolute value of -14?', options: ['-14', '14', '0', '28'], correctIndex: 1, hint: 'Absolute value measures distance from 0 and is never negative.', explanation: '|-14| = 14.' },
  { level: 3, prize: '$300', question: 'Which integer represents "a loss of 15 yards" in football?', options: ['+15', '-15', '0', '1.5'], correctIndex: 1, hint: 'A loss represents moving backward/negative.', explanation: 'A loss of 15 yards is represented by -15.' },
  { level: 4, prize: '$500', question: 'What is the sum of (-6) + (-5)?', options: ['-1', '+1', '-11', '+11'], correctIndex: 2, hint: 'When signs are the same, add their values and keep the sign.', explanation: '6 + 5 = 11, so (-6) + (-5) = -11.' },
  { level: 5, prize: '$1,000', question: 'What is a "zero pair" in two-color counter modeling?', options: ['Two zeros', 'One yellow counter (+1) and one red counter (-1)', 'Two negative counters', 'A double zero on roulette'], correctIndex: 1, hint: 'A positive and a negative cancel each other out.', explanation: '(+1) + (-1) = 0.' },
  { level: 6, prize: '$2,000', question: 'Solve: (-16) + 20', options: ['-4', '+4', '-36', '+36'], correctIndex: 1, hint: 'Different signs! Subtract 16 from 20.', explanation: '20 - 16 = 4. The positive has the larger absolute value, so +4.' },
  { level: 7, prize: '$4,000', question: 'How do you rewrite the subtraction expression 10 - 17 as addition?', options: ['10 + 17', '10 + (-17)', '-10 + 17', '17 + (-10)'], correctIndex: 1, hint: 'Keep the 10, change - to +, change 17 to -17.', explanation: 'a - b = a + (-b), so 10 - 17 = 10 + (-17).' },
  { level: 8, prize: '$8,000', question: 'Solve: (-8) - 14', options: ['-22', '+6', '-6', '+22'], correctIndex: 0, hint: 'Rewrite as (-8) + (-14).', explanation: '(-8) + (-14) = -22.' },
  { level: 9, prize: '$16,000', question: 'Solve: 5 - (-15)', options: ['-10', '+10', '+20', '-20'], correctIndex: 2, hint: 'Subtracting a negative turns into adding a positive!', explanation: '5 - (-15) = 5 + 15 = 20.' },
  { level: 10, prize: '$32,000', question: 'Simplify: (-45) + 38 + 45 + (-12)', options: ['26', '-26', '50', '0'], correctIndex: 0, hint: 'Spot the opposites (-45 and 45) first!', explanation: '(-45 + 45) cancels to 0. 38 + (-12) = 26.' },
  { level: 11, prize: '$64,000', question: 'Solve: (-4.6) + (-3.8)', options: ['-8.4', '+8.4', '-0.8', '+0.8'], correctIndex: 0, hint: 'Both negative: add 4.6 + 3.8 and keep negative.', explanation: '4.6 + 3.8 = 8.4 -> -8.4.' },
  { level: 12, prize: '$125,000', question: 'Solve: (-7.5) - (-10.2)', options: ['-17.7', '+2.7', '-2.7', '+17.7'], correctIndex: 1, hint: 'Keep -7.5, Change to +, Change -10.2 to +10.2.', explanation: '-7.5 + 10.2 = 10.2 - 7.5 = +2.7.' },
  { level: 13, prize: '$250,000', question: 'Solve: (-3/8) + (-1/4)', options: ['-4/12', '-5/8', '-2/8', '+1/8'], correctIndex: 1, hint: 'Convert -1/4 to -2/8 first.', explanation: '(-3/8) + (-2/8) = -5/8.' },
  { level: 14, prize: '$500,000', question: 'Solve: (-5/6) - (-1/2)', options: ['-1/3', '-4/4', '+1/3', '-4/6'], correctIndex: 0, hint: '(-5/6) + 3/6 = -2/6, then reduce!', explanation: '(-5/6) + (3/6) = -2/6 = -1/3.' },
  { level: 15, prize: '$1,000,000', question: 'A diver at -42.5 meters ascends 18.2 meters, then dives down another 15.7 meters. What is their final position?', options: ['-40.0 meters', '-24.3 meters', '-76.4 meters', '-8.6 meters'], correctIndex: 0, hint: '(-42.5) + 18.2 + (-15.7). Group negatives first!', explanation: '(-42.5 + -15.7) = -58.2. Then -58.2 + 18.2 = -40.0 meters!' }
];

export const ESCAPE_ROOM_CHAMBERS: EscapeRoomChamber[] = [
  {
    id: 1,
    title: "Chamber I: The Hall of Opposites",
    theme: "Mystic Scales of Equilibrium",
    lore: "You awaken in an ancient stone temple. An inscription on the pedestal reads: 'To pass, you must balance the scales of existence. Only when positive and negative reach perfect harmony (Sum = 0) will the door unseal.'",
    riddle: "A massive weight of -37 lies on the left pedestal. You must choose the exact matching gemstone to bring the scale's sum to 0.",
    puzzleType: 'opposites',
    targetAnswer: "+37",
    hint: "What is the additive inverse (opposite) of -37?",
    interactiveData: {
      leftWeight: -37,
      choices: ["-37", "+37", "0", "+74"]
    }
  },
  {
    id: 2,
    title: "Chamber II: The Laser of Absolute Value",
    theme: "Optical Beam Calibration",
    lore: "A crimson laser shoots across the chasm. The beam controller requires the absolute distance between two energy nodes: Node A at -48 and Node B at +16.",
    riddle: "Find the total distance between -48 and +16 on the coordinate line: |-48| + |16| or |16 - (-48)|.",
    puzzleType: 'absolute-value',
    targetAnswer: "64",
    hint: "To travel from -48 to 0 is 48 units. From 0 to +16 is 16 units. 48 + 16 = ?",
    interactiveData: {
      from: -48,
      to: 16,
      choices: ["32", "64", "-64", "48"]
    }
  },
  {
    id: 3,
    title: "Chamber III: The Zero Pair Crypt",
    theme: "Runestone Neutralizer",
    lore: "A stone portal has 5 positive sun runes (+5) carved on the left and requires you to remove 8 sun runes (5 - 8). But there are only 5 sun runes available! How many moon runes (-1) remain after neutralizing with zero pairs?",
    riddle: "Calculate: 5 - 8 using zero pairs.",
    puzzleType: 'zero-pairs',
    targetAnswer: "-3",
    hint: "Add 3 zero pairs so you have 8 sun runes and 3 moon runes. Remove the 8 sun runes. What remains?",
    interactiveData: {
      expression: "5 - 8",
      choices: ["+3", "-3", "+13", "-13"]
    }
  },
  {
    id: 4,
    title: "Chamber IV: The Rational Vault",
    theme: "Master Keystone Cipher",
    lore: "The final door is guarded by a golden dial requiring the exact value of the sacred rational equation: (-3.5) - (-8.25) + (-1.75).",
    riddle: "Compute: (-3.5) + 8.25 + (-1.75) to crack the keystone lock and escape!",
    puzzleType: 'rational-cipher',
    targetAnswer: "3",
    hint: "Group the negative decimals first: (-3.50) + (-1.75) = -5.25. Then calculate 8.25 - 5.25!",
    interactiveData: {
      expression: "(-3.5) - (-8.25) + (-1.75)",
      choices: ["2.5", "3", "3.5", "-3"]
    }
  }
];

export const MYSTERY_PICTURE_TEMPLATES = [
  {
    id: 'turkey-thanksgiving',
    name: 'Autumn Harvest Turkey',
    icon: '🦃',
    gridSize: 6,
    tiles: [
      { problem: '(-4) + (-3)', answer: -7, color: '#92400e' },
      { problem: '8 + (-8)', answer: 0, color: '#f59e0b' },
      { problem: '(-12) + 15', answer: 3, color: '#b45309' },
      { problem: '(-5) - 2', answer: -7, color: '#92400e' },
      { problem: '4 - (-2)', answer: 6, color: '#ea580c' },
      { problem: '(-10) + 3', answer: -7, color: '#92400e' },

      { problem: '(-9) + 9', answer: 0, color: '#f59e0b' },
      { problem: '2 + 4', answer: 6, color: '#ea580c' },
      { problem: '1 - 8', answer: -7, color: '#92400e' },
      { problem: '10 + (-7)', answer: 3, color: '#b45309' },
      { problem: '(-3) + 9', answer: 6, color: '#ea580c' },
      { problem: '14 + (-14)', answer: 0, color: '#f59e0b' },

      { problem: '(-15) + 8', answer: -7, color: '#92400e' },
      { problem: '12 - 9', answer: 3, color: '#b45309' },
      { problem: '(-2) + 8', answer: 6, color: '#ea580c' },
      { problem: '0 + 3', answer: 3, color: '#b45309' },
      { problem: '(-1) - 6', answer: -7, color: '#92400e' },
      { problem: '5 + (-5)', answer: 0, color: '#f59e0b' },

      { problem: '(-14) + 7', answer: -7, color: '#92400e' },
      { problem: '7 - 1', answer: 6, color: '#ea580c' },
      { problem: '(-1) + 4', answer: 3, color: '#b45309' },
      { problem: '8 - 5', answer: 3, color: '#b45309' },
      { problem: '3 - 10', answer: -7, color: '#92400e' },
      { problem: '6 + 0', answer: 6, color: '#ea580c' },

      { problem: '(-10) + 10', answer: 0, color: '#f59e0b' },
      { problem: '(-2) - 5', answer: -7, color: '#92400e' },
      { problem: '9 - 6', answer: 3, color: '#b45309' },
      { problem: '15 - 9', answer: 6, color: '#ea580c' },
      { problem: '(-11) + 4', answer: -7, color: '#92400e' },
      { problem: '20 + (-20)', answer: 0, color: '#f59e0b' },

      { problem: '(-4) - 3', answer: -7, color: '#92400e' },
      { problem: '1 + 5', answer: 6, color: '#ea580c' },
      { problem: '0 + 0', answer: 0, color: '#f59e0b' },
      { problem: '11 - 8', answer: 3, color: '#b45309' },
      { problem: '(-8) + 1', answer: -7, color: '#92400e' },
      { problem: '(-3) + 9', answer: 6, color: '#ea580c' }
    ]
  }
];
