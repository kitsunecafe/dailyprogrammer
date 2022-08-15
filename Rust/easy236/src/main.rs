use rand::rngs::ThreadRng;
use rand::seq::SliceRandom;
use rand::thread_rng;

#[derive(Clone)]
struct Bag<'a, T> {
    pub values: &'a [T],
    free: Vec<usize>,
    used: Vec<usize>,
    rng: ThreadRng,
}

impl<'a, T: Clone> Bag<'a, T> {
    pub fn new(values: &'a [T]) -> Self {
        let len = values.len();

        Self {
            values,
            free: (0..len).collect(),
            used: Vec::with_capacity(len),
            rng: thread_rng(),
        }
    }
}

impl<'a, T: Clone> Iterator for Bag<'a, T> {
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
    let tetrominos = Bag::new(vec!['O', 'I', 'S', 'Z', 'L', 'J', 'T'].as_slice())
        .take(50)
        .collect::<String>();

    println!("{}", tetrominos);
}
