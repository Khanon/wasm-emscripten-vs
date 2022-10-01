# CMakeList.txt : CMake project for webpack-emcc, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

project ("webpack-emcc")

# Add source to this project's executable.
add_executable (webpack-emcc "webpack-emcc.cpp" "webpack-emcc.h")

# Add emscripten include directory
target_include_directories(webpack-emcc PUBLIC "C:/Proyectos/_compilers/emsdk/upstream/emscripten/cache/sysroot/include")

set(CMAKE_EXECUTABLE_SUFFIX .mjs)

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET webpack-emcc PROPERTY CXX_STANDARD 20)
endif()

# Add post-build command to copy WASM to Webpack project ⬇️
if (CMAKE_BUILD_TYPE MATCHES "Debug")
    set(SOURCE_FOLDER ${PROJECT_SOURCE_DIR}/out/build/x64-debug)
else()
    set(SOURCE_FOLDER ${PROJECT_SOURCE_DIR}/out/build/x64-release)
endif()

set(TARGET_WEBPACK_JS "${PROJECT_SOURCE_DIR}/../webpack-project/src")

message("Copying WASM file from " ${SOURCE_WASM} " to " ${TARGET_WEBPACK_WASM})

add_custom_command(TARGET webpack-emcc POST_BUILD
   COMMAND ${CMAKE_COMMAND} -E copy ${SOURCE_FOLDER}/webpack-emcc.wasm ${TARGET_WEBPACK_JS}
   COMMAND ${CMAKE_COMMAND} -E copy ${SOURCE_FOLDER}/webpack-emcc.mjs ${TARGET_WEBPACK_JS}
)