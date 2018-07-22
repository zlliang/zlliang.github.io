---
title: 关于重要性采样（Importance sampling）的一道题目
date: 2018-06-06
---

今天遇到一道题目，是对自己薄弱的概率论计算的一次可怕的检验，特此记录．

> 假设 $X_i$ 服从参数为 $1/(i+2),$，$i = 1, 2, 3, 4$ 的指数分布 $\pi_i$，$S$ $=$ $\sum_{i=1}^4$ $X_i$，用重要性采样估计 $\theta$ $=$ $\expec(S|S>62)$．

为了体现重要性采样的优势，我们先建立一个基准方法．要估计 $\theta$，我们可以简单地按照 $X_i$ 的分布独立地生成一组样本 $S$，而后选取出使 $S > 62$ 的样本求均值．

若要使用重要性采样方法，我们必须得到 $S > 62$ 的条件下 $S$ 的分布，有
$$
\begin{aligned}
  \expec_\pi(S|S>62) &= \int_{S>62} s \cdot \frac{\pi(x)}{\int_{\sum_i x_i >62} \pi(u) \diff u} \diff x \\
  &= \frac{\int_{\sum_i x_i>62} \prod_i \pi_i(x_i) \sum_i x_i \diff x}{\int_{\sum_i x_i >62} \prod_i \pi_i(x_i) \diff x}.
\end{aligned}
$$
根据这个式子，对分子、分母两部分，我们可以分别做重要性采样进行估计．对分子，有
$$
\int_{\sum_i x_i>62} \prod_i \pi_i(x_i) \sum_i x_i \diff x = \int_{\sum_i x_i > 62} \prod_i \frac{\pi_i(x_i)}{q_i(x_i)} \left(\sum_i x_i\right) \prod_i q_i(x_i) \diff x.
$$
其中 $q_i$ 为 $x_i$ 对应的建议分布（proposal distribution）．对这一部分，我们可以对分布 $q_i$ 采样出 $X_i$，而后选取 $\sum_i X_i > 62$ 的样本计算 $\pi(X)(\sum_iX_i)/q(X)$ 的均值即可．

对分母，类似地有
$$
\int_{\sum_i x_i>62} \prod_i \pi_i(x_i) \diff x = \int_{\sum_i x_i > 62} \prod_i \frac{\pi_i(x_i)}{\tilde{q}_i(x_i)} \prod_i \tilde{q}_i(x_i) \diff x.
$$
其中 $\tilde{q}_i$ 为 $x_i$ 对应的建议分布（proposal distribution）．对这一部分，我们可以对分布 $\tilde{q}_i$ 采样出 $X_i$，而后选取 $\sum_i X_i > 62$ 的样本计算 $\pi(X)/\tilde{q}(X)$ 的均值．

实验中，我们选取了 $q_i(x_i) = \tilde{q}_i(x_i) = \frac{1}{i+6} \me^{-\frac{1}{i+6}x_i}$．取这种均值更大的指数分布的直观想法是为了让 $\sum_i X_i > 62$ 的样本更多，以求对积分的估计更准确．下表显示了使用基准方法与重要性采样方法所得样本（重要性采样对应方差指的是估计分子时的样本方差）的信息．

采样方式 | 估计结果（均值） | 方差 | 满足 $S>62$ 的样本比例
--|--|--|--
直接采样 | 68.36118 | 33.04041 | 0.00090
重要性采样 | 68.37272 | 1.42757 | 0.06929

可以看出，在采样个数为 $n = 10^5$ 时，两种采样方式获得的均值一致，均是对原期望的良好估计．而按照重要性采样方式可以大幅提升满足要求的样本的比例，并让采样方差减小．因此，这种方式对原期望的估计会更准确．的确，如果仅取 $10^3$ 个采样点，由于满足要求的样本太少，会导致直接采样的估计方法对期望的估计有偏差，大约落在 62.0--85.0 之间，而重要性采样的方式仍能保持较好的结果．