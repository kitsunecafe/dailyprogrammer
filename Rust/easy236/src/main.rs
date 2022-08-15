use rand::rngs::ThreadRng;
use rand::seq::SliceRandom;
use rand::thread_rng;

#[derive(Clone)]
struct Bag<T> {
    pub values: Vec<T>,
    free: Vec<usize>,
    used: Vec<usize>,
    rng: ThreadRng,
}

impl<T: Clone> Bag<T> {
    pub fn new(values: Vec<T>) -> Self {
        let len = values.len();

        Self {
            values,
            free: (0..len).collect(),
            used: Vec::with_capacity(len),
            rng: thread_rng(),
        }
    }
}

impl<T: Clone> Iterator for Bag<T> {
    type Item = T;

    fn next(&mut self) -> Option<T> {
        if self.free.is_empty() {
            self.free.append(&mut self.used);
            self.free.shuffle(&mut self.rng);
        }

        let next_idx = self.free.pop().unwrap();

        self.used.push(next_idx);

        Some(self.values[next_idx].clone())
    }
}

fn main() {
    let tetrominos = Bag::new(vec!['O', 'I', 'S', 'Z', 'L', 'J', 'T'])
        .take(50)
        .collect::<String>();

    println!("{}", tetrominos);
}
