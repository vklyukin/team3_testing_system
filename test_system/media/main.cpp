#include "ReadWriter.cpp"
#include <vector>
#include <algorithm>
#include <iostream>
    

//Можно добавлять любые методы для решения задачи.
bool cmp(Node* a, Node* b) {
    return a->name < b->name;
}

void dfs(Node* curr, std::vector<std::string>& result) {
    curr->visited = true;

    result.push_back(curr->name);
    std::sort(curr->neighbours.begin(), curr->neighbours.end(), cmp);

    for (Node* node : curr->neighbours) {
        if (!node->visited) {
            dfs(node, result);
        }
    }
}


//Задача - реализовать данный метод, решение должно быть в переменной result
void solve(std::vector<Node>& graph, int start, std::vector<std::string>& result) {
    Node* curr = &graph[start];
    dfs(curr, result);
}

int main() {
    std::vector<Node> graph;
    std::vector<std::string> result;
    int start;

    ReadWriter rw;
    rw.readGraph(graph, start);
    solve(graph, start, result);
    rw.writeAnswer(result);
    return 0;
}
