#version 460
#extension GL_ARB_sparse_texture2 : require

struct SparseTexel
{
    uint _m0;
    vec4 _m1;
};

struct _54
{
    float _m0;
    float _m1;
    float _m2;
    float _m3;
    uint _m4;
};

layout(set = 0, binding = 3) uniform texture2D _8;
layout(set = 0, binding = 4) uniform texture2DArray _11;
layout(set = 0, binding = 1) uniform samplerShadow _14;

layout(location = 0) in vec4 TEXCOORD;
layout(location = 0) out vec4 SV_Target;

void main()
{
    vec2 _40 = vec2(TEXCOORD.x, TEXCOORD.y);
    uint _103;
    vec4 _104;
    _103 = sparseTextureGatherOffsetARB(sampler2DShadow(_8, _14), _40, TEXCOORD.z, ivec2(-3, -4), _104);
    SparseTexel _45 = SparseTexel(_103, _104);
    vec4 _49 = _45._m1;
    _54 _55 = _54(_49.x, _49.y, _49.z, _49.w, _45._m0);
    vec3 _69 = vec3(TEXCOORD.x, TEXCOORD.y, TEXCOORD.z);
    uint _105;
    vec4 _106;
    _105 = sparseTextureGatherOffsetARB(sampler2DArrayShadow(_11, _14), _69, TEXCOORD.w, ivec2(-4, -5), _106);
    SparseTexel _71 = SparseTexel(_105, _106);
    vec4 _74 = _71._m1;
    _54 _79 = _54(_74.x, _74.y, _74.z, _74.w, _71._m0);
    float _87 = float(sparseTexelsResidentARB(int(_79._m4))) + float(sparseTexelsResidentARB(int(_55._m4)));
    SV_Target.x = (_79._m0 + _55._m0) + _87;
    SV_Target.y = (_79._m1 + _55._m1) + _87;
    SV_Target.z = (_79._m2 + _55._m2) + _87;
    SV_Target.w = (_79._m3 + _55._m3) + _87;
}


#if 0
// SPIR-V disassembly
; SPIR-V
; Version: 1.3
; Generator: Unknown(30017); 21022
; Bound: 103
; Schema: 0
OpCapability Shader
OpCapability SparseResidency
OpMemoryModel Logical GLSL450
OpEntryPoint Fragment %3 "main" %17 %19
OpExecutionMode %3 OriginUpperLeft
OpName %3 "main"
OpName %17 "TEXCOORD"
OpName %19 "SV_Target"
OpName %44 "SparseTexel"
OpName %54 ""
OpDecorate %8 DescriptorSet 0
OpDecorate %8 Binding 3
OpDecorate %11 DescriptorSet 0
OpDecorate %11 Binding 4
OpDecorate %14 DescriptorSet 0
OpDecorate %14 Binding 1
OpDecorate %17 Location 0
OpDecorate %19 Location 0
%1 = OpTypeVoid
%2 = OpTypeFunction %1
%5 = OpTypeFloat 32
%6 = OpTypeImage %5 2D 0 0 0 1 Unknown
%7 = OpTypePointer UniformConstant %6
%8 = OpVariable %7 UniformConstant
%9 = OpTypeImage %5 2D 0 1 0 1 Unknown
%10 = OpTypePointer UniformConstant %9
%11 = OpVariable %10 UniformConstant
%12 = OpTypeSampler
%13 = OpTypePointer UniformConstant %12
%14 = OpVariable %13 UniformConstant
%15 = OpTypeVector %5 4
%16 = OpTypePointer Input %15
%17 = OpVariable %16 Input
%18 = OpTypePointer Output %15
%19 = OpVariable %18 Output
%23 = OpTypePointer Input %5
%25 = OpTypeInt 32 0
%26 = OpConstant %25 0
%29 = OpConstant %25 1
%32 = OpConstant %25 2
%35 = OpConstant %25 3
%37 = OpTypeSampledImage %6
%39 = OpTypeVector %5 2
%41 = OpTypeInt 32 1
%42 = OpConstant %41 -3
%43 = OpConstant %41 -4
%44 = OpTypeStruct %25 %15
%46 = OpTypeVector %41 2
%47 = OpConstantComposite %46 %42 %43
%54 = OpTypeStruct %5 %5 %5 %5 %25
%61 = OpTypeBool
%64 = OpConstant %5 1
%65 = OpConstant %5 0
%66 = OpTypeSampledImage %9
%68 = OpTypeVector %5 3
%70 = OpConstant %41 -5
%72 = OpConstantComposite %46 %43 %70
%96 = OpTypePointer Output %5
%3 = OpFunction %1 None %2
%4 = OpLabel
OpBranch %101
%101 = OpLabel
%20 = OpLoad %9 %11
%21 = OpLoad %6 %8
%22 = OpLoad %12 %14
%24 = OpAccessChain %23 %17 %26
%27 = OpLoad %5 %24
%28 = OpAccessChain %23 %17 %29
%30 = OpLoad %5 %28
%31 = OpAccessChain %23 %17 %32
%33 = OpLoad %5 %31
%34 = OpAccessChain %23 %17 %35
%36 = OpLoad %5 %34
%38 = OpSampledImage %37 %21 %22
%40 = OpCompositeConstruct %39 %27 %30
%45 = OpImageSparseDrefGather %44 %38 %40 %33 ConstOffset %47
%48 = OpCompositeExtract %25 %45 0
%49 = OpCompositeExtract %15 %45 1
%50 = OpCompositeExtract %5 %49 0
%51 = OpCompositeExtract %5 %49 1
%52 = OpCompositeExtract %5 %49 2
%53 = OpCompositeExtract %5 %49 3
%55 = OpCompositeConstruct %54 %50 %51 %52 %53 %48
%56 = OpCompositeExtract %5 %55 0
%57 = OpCompositeExtract %5 %55 1
%58 = OpCompositeExtract %5 %55 2
%59 = OpCompositeExtract %5 %55 3
%60 = OpCompositeExtract %25 %55 4
%62 = OpImageSparseTexelsResident %61 %60
%63 = OpSelect %5 %62 %64 %65
%67 = OpSampledImage %66 %20 %22
%69 = OpCompositeConstruct %68 %27 %30 %33
%71 = OpImageSparseDrefGather %44 %67 %69 %36 ConstOffset %72
%73 = OpCompositeExtract %25 %71 0
%74 = OpCompositeExtract %15 %71 1
%75 = OpCompositeExtract %5 %74 0
%76 = OpCompositeExtract %5 %74 1
%77 = OpCompositeExtract %5 %74 2
%78 = OpCompositeExtract %5 %74 3
%79 = OpCompositeConstruct %54 %75 %76 %77 %78 %73
%80 = OpCompositeExtract %5 %79 0
%81 = OpCompositeExtract %5 %79 1
%82 = OpCompositeExtract %5 %79 2
%83 = OpCompositeExtract %5 %79 3
%84 = OpCompositeExtract %25 %79 4
%85 = OpImageSparseTexelsResident %61 %84
%86 = OpSelect %5 %85 %64 %65
%87 = OpFAdd %5 %86 %63
%88 = OpFAdd %5 %80 %56
%89 = OpFAdd %5 %88 %87
%90 = OpFAdd %5 %81 %57
%91 = OpFAdd %5 %90 %87
%92 = OpFAdd %5 %82 %58
%93 = OpFAdd %5 %92 %87
%94 = OpFAdd %5 %83 %59
%95 = OpFAdd %5 %94 %87
%97 = OpAccessChain %96 %19 %26
OpStore %97 %89
%98 = OpAccessChain %96 %19 %29
OpStore %98 %91
%99 = OpAccessChain %96 %19 %32
OpStore %99 %93
%100 = OpAccessChain %96 %19 %35
OpStore %100 %95
OpReturn
OpFunctionEnd
#endif
