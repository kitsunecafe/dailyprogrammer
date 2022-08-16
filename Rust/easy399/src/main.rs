use std::{collections::HashMap, fs, path::Path};

fn word_value(values: &HashMap<char, usize>, word: &str) -> usize {
    word.chars()
        .into_iter()
        .map(|ch| values.get(&ch))
        .flat_map(|v| v)
        .sum()
}

fn create_value_map<'a, 'b>(
    values: &'a HashMap<char, usize>,
    words: Vec<&'b str>,
) -> HashMap<usize, Vec<&'b str>> {
    let mut word_values: HashMap<usize, Vec<&str>> = HashMap::new();
    for word in words {
        let value = word_value(values, word);
        word_values.entry(value).or_insert(Vec::new()).push(word);
    }

    word_values
}

fn do_bonuses(values: &HashMap<char, usize>, enable1: String) {
    let words: Vec<&str> = enable1.split_terminator('\n').collect();
    let word_values = create_value_map(values, words);

    if let Some(word) = word_values.get(&319) {
        println!("Bonus 1: {}", word[0]);
    }

    let sum: usize = word_values
        .iter()
        .filter(|&(key, _value)| key % 2 != 0)
        .map(|(_key, value)| value.len())
        .sum();

    println!("Bonus 2: {}", sum);

    if let Some((max, words)) = word_values
        .iter()
        .max_by(|&(_, x), &(_, y)| x.len().cmp(&y.len()))
    {
        println!("Bonus 3: {} with {} words", max, words.len());
    }
}

fn main() {
    let values: HashMap<char, usize> = ('a'..='z')
        .into_iter()
        .enumerate()
        .map(|(i, ch)| (ch, i + 1))
        .collect();

    let words = vec![
        "",
        "a",
        "z",
        "cab",
        "excellent",
        "microspectrophotometries ",
    ];

    let word_values = words.iter().map(|word| (*word, word_value(&values, word)));

    for (word, value) in word_values {
        println!("{}: {}", word, value);
    }

    if let Ok(content) = fs::read_to_string(Path::new("../../static/enable1.txt")) {
        do_bonuses(&values, content);
    }
}
