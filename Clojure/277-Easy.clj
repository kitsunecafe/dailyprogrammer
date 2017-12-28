(defn gcd [a b]
  (if (zero? b)
    a
    (recur b (mod a b))))

(defn -main
  [& args]
  (let [args (map read-string args) a (first args) b (last args) g (gcd a b)]
    (println (/ a g)(/ b g))))

