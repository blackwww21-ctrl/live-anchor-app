cmake_minimum_required(VERSION 3.22.1)

project("liveanchor")

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加React Native Agora库的包含路径
# 这通常由react-native-agora自动处理，这里只是基本配置

# 如果需要添加本地的C++代码，可以在这里添加
# add_library(mylib SHARED src/main/cpp/native-lib.cpp)

# 链接系统库
# target_link_libraries(mylib log)